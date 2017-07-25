#!/usr/bin/env node
/*! @license GNU GPLv3 / ©2017 Nick Benik, HackerCEO.org */
/* Standalone Overlaying Proxy Server for i2b2 Web Client Development */

const _ = require('lodash'),
    colors = require('colors/safe'),
    fs = require('fs'),
    path = require('path');
    finalhandler = require('finalhandler');

// creates a new OverlayEngine
function OverlayEngine(options) {
    this.configuration = options;
    // Create the HTTP(S) server
    console.dir(options);
    this.sockets = 0;


    // build all the routes for the passed configuration
    var Router = require('router');
    var router = Router();

    // OVERRIDE CONTROLLERS

//    router.get('/i2b2_config_data.js', function (req, res) {
//        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
//        res.end('process the i2b2 instance configuration');
//    });

    router.get(/^\/js-i2b2\/.*\/cell_config_data\.js$/m, function (req, res) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        var lookupPath = req.originalUrl.replace('/cell_config_data.js', '');
        console.warn(lookupPath);
        res.end(`process the i2b2 cell [test] configuration`);
    });



    // create the static serving engine
    console.warn(this.configuration.webclient.directory);
    var serveStatic = require('serve-static');
    router.use(serveStatic('./hosting/wc-core/' + this.configuration.webclient.directory, {"fallthrough": false}));

//    router.use(
//        function(req, res, next) {
//            res.setHeader('Content-Type', 'text/plain; charset=utf-8')
//            res.write('test global')
//            next();
//        }
//    );


    this.server = require('http').createServer(
        function(req, res) {
            router(req, res, finalhandler(req, res));
        }
    );

}


OverlayEngine.prototype.stop = function() {
    console.log(colors.red.inverse("SHUTDOWN") + colors.gray(" of hosting engine has been initiated..."));
    //
    this.server.close();
}

OverlayEngine.prototype.start = function() {
    console.log(colors.green.inverse("STARTUP") + colors.gray(" of hosting engine has been initiated..."));
    this.server.listen(this.configuration.hosting.main.port);
}




module.exports = OverlayEngine;
