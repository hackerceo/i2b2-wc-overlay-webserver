'use strict'

// creates a new override module
function Override_i2b2Cells(options) {
    this.options = options;
    return (function (req, res) {
        console.log("=== BINGO ===");
        res.setHeader('i2b2-dev-svr-mode', 'module:cells');
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        let lookupPath = req.originalUrl.replace('/cell_config_data.js', '');
        console.warn(lookupPath);
        res.end(`process the i2b2 cell [test] configuration`);
        console.dir(this.options);
    });
}

module.exports = Override_i2b2Cells;