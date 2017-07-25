#!/usr/bin/env node
/*! @license MIT ©2017 Nick Benik, HackerCEO.org */
/* Standalone Overlaying Proxy Server for i2b2 Web Client Development */

console.warn("STARTING STANDALONE SERVER");

const _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    colors = require('colors/safe');

// Parse arguments
var args = process.argv.slice(2);
if (args.length < 1 || args.length > 3 || /^--?h(elp)?$/.test(args[0])) {
    console.log('usage: standalone config.json [port]');
    return process.exit(1);
}

var configDefaults = JSON.parse(fs.readFileSync(path.join(__dirname, 'config/config-defaults.json'))),
    config = _.defaults(JSON.parse(fs.readFileSync(args[0])), configDefaults);

// ensure the major config elements are setup properly
var config_tests = ["hosting.environment", "hosting.main.port"];
var dir_tests = [];

var config_passed = true;
while (config_tests.length > 0) {
    var test_element = config_tests.shift();
    // is it configured?
    if (!_.has(config, test_element)) {
        console.log(colors.red(`FATAL: A configuration setting ['${test_element}'] is not properly defined in the configuration file(s)!`));
        config_passed = false;
        break;
    }
    // add additional tests as needed
    switch(test_element) {
        case "hosting.environment":
            var env_ident = config.hosting.environment;
            config_tests.push(`environments.${env_ident}`);
            break;
        case `environments.${env_ident}`:
            config_tests.push(`environments.${env_ident}.webclient`);
            config_tests.push(`environments.${env_ident}.overrides`);
            break;
        case `environments.${env_ident}.webclient`:
            var env_webclient = config.environments[env_ident].webclient;
            config_tests.push(`webclients['${env_webclient}'].directory`);
        case `webclients['${env_webclient}'].directory`:
            var env_webclient_dir = "./hosting/wc-core/"+config.webclients[env_webclient].directory;
            dir_tests.push(`webclients['${env_webclient}'].directory`);
            break;
        case `environments.${env_ident}.overrides`:
            // check each and every override module's config
            for (key in config.environments[env_ident].overrides) {
                config_tests.push(`overrides.${key}.module.bind`);
                config_tests.push(`overrides.${key}.module.location`);
            }
            break;
        default:
            if (test_element.indexOf('.overrides.') > 0) {
                // this deals with override module checking and loading
                var override_name = test_element.replace("overrides.", '');
                console.warn(override_name);
            }
            break;
    }
}

if (config_passed === true) {
    var config_passed = colors.inverse.green("PASSED");
    console.log(colors.white("Configuration " + config_passed + " for selected environement: " + colors.bold(env_ident)));
} else {
    var config_passed = colors.inverse.red("FAILED");
    console.log(colors.white("Configuration " + config_passed + " for selected environement: " + colors.bold(env_ident)));
    return process.exit(1);
}

// extract the environment configuration and rewrite it to the output
var host_config = {
    "hosting": config.hosting,
    "plugins": config.plugins,
    "webclient": config.webclients[env_webclient],
    "overrides": config.overrides,
    "environment": config.environments[env_ident]
};

// start the main server
var services = require('./server/main.js');
// load the selected hosting configuration
services.hostStart(host_config);



console.log(colors.yellow(`Started i2b2 Web Client ['${env_ident}'] on port ${config.hosting.main.port}`));
console.log(colors.yellow(`Started administrator interface on port ${config.hosting.admin.port}`));







