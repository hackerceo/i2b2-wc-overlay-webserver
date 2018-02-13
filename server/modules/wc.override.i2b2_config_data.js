'use strict'

const _ = require('lodash'),
    fs = require('fs');


// creates a new override module
function Override_i2b2ConfigData(options) {
    const immut = options;
    this.options = immut;
    return (function (req, res) {
        // load the default i2b2_loader.js file from the web client
        var i2b2_config = String(fs.readFileSync('./hosting/wc-core/'+this.options.global.webclient.directory+'/i2b2_config_data.js'));
        eval('i2b2_config = '+i2b2_config);


        // delete the default cell list
        delete i2b2_config.lstDomains;

        // build the domain list
        i2b2_config.lstDomains = _.map(this.options.local.domains, (function(v,i) { return this.options.global.domains[v]; }).bind(this));
        // change the proxy URL for this instance
        i2b2_config.urlProxy = "~proxy";

        res.setHeader('Content-Type', 'text/javascript');
        res.end(JSON.stringify(i2b2_config));
    }).bind(this);
}


module.exports = Override_i2b2ConfigData;
