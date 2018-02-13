#!/usr/bin/env node
/*! @license GNU GPLv3 / ©2017 Nick Benik, HackerCEO.org */
/* Standalone Overlaying Proxy Server for i2b2 Web Client Development */

const _ = require('lodash'),
    colors = require('colors/safe'),
    fs = require('fs'),
    path = require('path'),
    Router = require('router');

// creates a new OverlayEngine
function OverlayEngine(options) {
    this.configuration = options;
    // Create the HTTP(S) server
    console.dir(options);
    this.sockets = 0;

    // TODO: Check to make sure all given directories are valid

    // create the static serving engine
    var final_route = Router();
    var serveStatic = require('serve-static');
    final_route.use(serveStatic('./hosting/wc-core/' + this.configuration.webclient.directory, {"fallthrough": false}));

    // build all the routes for the passed configuration
    this.router = Router();
    // OVERRIDE CONTROLLERS
    _.forEach(options.environment.overrides, (function(conf, name){
        // load the override module if the file exists
        if (!fs.existsSync("./server/modules/" + this.configuration.overrides[name].module.location)) {
            console.error("./server/modules/" + this.configuration.overrides[name].module.location + " does not exist!");
        } else {
            console.log(`Loading Override ['${name}']`);
//            const binding_regex = new RegExp(this.configuration.overrides[name].module.bind);
            const binding_regex = this.configuration.overrides[name].module.bind;
            const override_handler = new (require("./modules/" + this.configuration.overrides[name].module.location))({ "local": conf, "global": this.configuration });
//            this.router.get(binding_regex, (function() {
              this.router.all(binding_regex, (function() {
                // return the closured module
                return function(request, result) {
                    return override_handler(request, result);
                }
            })());
        }
    }).bind(this));

    this.router.all('/*', final_route);

//    router.get('/i2b2_config_data.js', function (req, res) {
//        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
//        res.end('process the i2b2 instance configuration');
//    });
//
//    router.get(/^\/js-i2b2\/.*\/cell_config_data\.js$/m, function (req, res) {
//        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
//        var lookupPath = req.originalUrl.replace('/cell_config_data.js', '');
//        console.warn(lookupPath);
//        res.end(`process the i2b2 cell [test] configuration`);
//    });




//    router.use(
//        function(req, res, next) {
//            res.setHeader('Content-Type', 'text/plain; charset=utf-8')
//            res.write('test global')
//            next();
//        }
//    );
}


OverlayEngine.prototype.stop = function() {
    console.log(colors.red.inverse("SHUTDOWN") + colors.gray(" of hosting engine has been initiated..."));
    this.server.close();
}

OverlayEngine.prototype.start = function(proxyObj) {
    console.log(colors.green.inverse("STARTUP") + colors.gray(" of hosting engine has been initiated..."));

    // setup the router paths
    var finalhandler = require('finalhandler');
    var router_stack = Router();

    // handle proxy system if needed
    if (typeof proxyObj !== 'undefined') {
        if (_.isFunction(proxyObj.getRouter)) {
            router_stack.use(proxyObj.getRouter());
        }
    }

    router_stack.all("/*", this.router);

    this.server = require('http').createServer(
        function(req, res) {
            console.log(req.url);
            router_stack(req, res, finalhandler(req, res));
        }
    );



    this.server.listen(this.configuration.hosting.main.port);
}


module.exports = OverlayEngine;
