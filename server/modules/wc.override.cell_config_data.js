'use strict'

// creates a new override module
function Override_i2b2CellConfigData(options) {
    const immut = options;
    this.options = immut;
    return (function (req, res) {
        console.log("=== BINGO ===");
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        var lookupPath = req.originalUrl.replace('/cell_config_data.js', '');
//        console.warn(lookupPath);
        res.end(`process the i2b2 cell [test] configuration`);
//        console.dir(this.options);
    }).bind(this);
}

module.exports = Override_i2b2CellConfigData;


