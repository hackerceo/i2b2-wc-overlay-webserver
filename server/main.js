#!/usr/bin/env node
/*! @license GNU GPLv3 / ©2017 Nick Benik, HackerCEO.org */
/* Standalone Overlaying Proxy Server for i2b2 Web Client Development */

'use strict'

const _ = require('lodash');

function ServerContoller() {
    this.configuration = null;
    this.service = {
        admin: null,
        debug: null,
        hosting: null,
        proxy: null
    };
}

ServerContoller.prototype.hostStart = function(options) {
    if (_.isPlainObject(options)) {
        this.configuration = options;
    } else {
        // throw an  error if configuration is not already set
    }

    // stop old processing
    this.hostStop();
    this.proxyStop();


    // create hosting service process
    const OverlayEngine = require('./overlay-engine.js');
    this.service.hosting = new OverlayEngine(this.configuration);

    // create proxy service process
    if (this.configuration.hosting.main.proxy) {
        const ProxyEngine = require('./proxy-engine.js');
        this.service.proxy = new ProxyEngine(this.configuration);
        this.service.proxy.start();
        this.service.hosting.start(this.service.proxy);
    } else {
        this.service.hosting.start();
    }

};

ServerContoller.prototype.hostStop = function() {
    // stop hosting processing
    if (typeof this.service.hosting === 'undefined') return false;
    if (_.has(this.service.hosting, 'stop')) {
        if (_.isFunction(this.service.hosting.stop)) {
            this.service.hosting.stop();
            return true;
        }
    }
    return false;
};

ServerContoller.prototype.proxyStart = function(options) {};
ServerContoller.prototype.proxyStop = function() {
    // stop proxy service
    if (typeof this.service.proxy === 'undefined') return false;
    if (_.has(this.service.proxy, 'stop')) {
        if (_.isFunction(this.service.proxy.stop)) {
            this.service.proxy.stop();
            return true;
        }
    }
    return false;
};


ServerContoller.prototype.adminStart = function(options) {
    console.dir(options);
    if (_.isPlainObject(options)) {
        this.configuration = options;
    } else {
        // throw an  error if configuration is not already set
    }

    // stop old processing
    if (_.isPlainObject(this.service.admin)) {
        this.service.admin.stop();
        this.service.admin.configure(options);
    } else {
        // create hosting for admin interface process
        const OverlayEngine = require('./overlay-engine.js');
        this.service.hosting = new OverlayEngine(this.configuration);
    }

    // create proxy service process
    if (this.configuration.hosting.main.admin) {
        const AdminApp = require('./proxy-engine.js');
        this.service.admin = new AdminApp(this.configuration);
        this.service.admin.start();
    } else {
        this.service.admin.start();
    }
};
ServerContoller.prototype.adminStop = function() {
    // stop proxy service
    if (typeof this.service.admin === 'undefined') return false;
    if (_.has(this.service.admin, 'stop')) {
        if (_.isFunction(this.service.admin.stop)) {
            this.service.admin.stop();
            return true;
        }
    }
    return false;
};
ServerContoller.prototype.debugStart = function(options) {};
ServerContoller.prototype.debugStop = function() {};

module.exports = new ServerContoller();
