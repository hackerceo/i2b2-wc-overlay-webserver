#!/usr/bin/env node
/*! @license GNU GPLv3 / ©2017 Nick Benik, HackerCEO.org */
/* Standalone Overlaying Proxy Server for i2b2 Web Client Development */

'use strict'

const _ = require('lodash');

function ServerContoller() {
    this.configuration = null;
    this.service = {
        hosting: null,
        admin: null
    };
}

ServerContoller.prototype.hostStart = function(options) {
    if (_.isPlainObject(options)) {
        this.configuration = options;
    } else {
        // throw an  error if configuration is not already set
    }

    // stop old hosting processing
    if (_.has(this.service.hosting, 'stop')) {
        if (_.isFunction(this.service.hosting.stop)) {
            this.service.hosting.stop();
        }
    }

    // create hosting process
    const OverlayEngine = require('./overlay-engine.js');
    this.service.hosting = new OverlayEngine(this.configuration);
    this.service.hosting.start();

};

ServerContoller.prototype.hostStop = function() {};
ServerContoller.prototype.adminStart = function(options) {};
ServerContoller.prototype.adminStop = function(options) {};

module.exports = new ServerContoller();
