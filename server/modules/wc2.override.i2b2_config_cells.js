'use strict'

// TODO: Rework this!!!

const _ = require('lodash'),
    fs = require('fs');


// creates a new override module
function Override_i2b2LoaderCellsJSON(options) {
    const immut = options;
    this.options = immut;
    return (function (req, res) {
        // load the default i2b2_loader.js file from the web client
        var i2b2_loader = String(fs.readFileSync('./hosting/wc-core/'+this.options.global.webclient.directory+'/js-i2b2/i2b2_loader.js'));

        // extract the default cell list
        var tag_start = i2b2_loader.indexOf(this.options.local.replace_locations.start);
        var tag_stop = i2b2_loader.indexOf(this.options.local.replace_locations.end, tag_start + 1 );
        if (tag_start > 0 & tag_stop > 0) {
            // trim to the first "=" after the start tag position
            tag_start = i2b2_loader.indexOf("=",tag_start) + 1;
            var default_cells = eval(i2b2_loader.substr(tag_start, tag_stop - tag_start));
            default_cells = _.keyBy(default_cells, function(o) { return o.code; });
        } else {
            var default_cells = {};
        }

        // update/augment the default cell list with configurations for the currently selected environment
        var to_update = _.mapValues(this.options.local.load_plugins, (function(v, i) { if(this[i]) { return this[i].code } else {return null}; }).bind(this.options.global.plugins.loaded));
        to_update = _.invert(to_update);
        delete to_update[null];
        to_update = _.mapValues(to_update, (function(v) { if (_.has(this, v+".config")) { return this[v].config; } else { return {}; }}).bind(this.options.local.load_plugins));

        // update the default cells list
        var final_cell_list = _.values(_.merge(default_cells, to_update));

        // replace the cell list variable
        var config_output = i2b2_loader.substr(0, tag_start) + JSON.stringify(final_cell_list) + i2b2_loader.substr(tag_stop);
        res.setHeader('i2b2-dev-svr-mode', 'module:i2b2_loader');
        res.setHeader('Content-Type', 'text/javascript');
        res.end(config_output);

        var lookupPath = req.originalUrl.replace('/cell_config_data.js', '');
        console.warn(lookupPath);


    }).bind(this);
}


module.exports = Override_i2b2LoaderCellsJSON;
