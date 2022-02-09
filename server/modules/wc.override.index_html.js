'use strict'

const _ = require('lodash'),
    fs = require('fs');


// creates a new override module
function Override_index_html(options) {
    console.warn("ping");
    const immut = options;
    this.options = immut;
    return (function (req, res) {
        // load the default.htm or index.html from the web client
        var i2b2_loader = String(fs.readFileSync('./hosting/wc-core/'+this.options.global.webclient.directory+'/js-i2b2/i2b2_loader.js'));


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


module.exports = Override_i2b2Loader;
