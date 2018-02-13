#!/usr/bin/env node
/*! @license GNU GPLv3 / ©2017 Nick Benik, HackerCEO.org */
/* Standalone Overlaying Proxy Server for i2b2 Web Client Development */

const _ = require('lodash'),
    colors = require('colors/safe'),
    url = require('url'),
    http = require('http'),
    dom = require('xmldom').DOMParser,
    xpath = require('xpath');

// creates a new OverlayEngine
function ProxyEngine(options) {
    this.configuration = options;
    this.router = (function(req, res, next) {
        if (req._parsedUrl.pathname !== this.configuration.hosting.main.proxy) {
            next();
        } else {
            console.warn("+++ PROXY REQUEST +++");
            var body = [];
            var body_len = 0;
            req.on('data', function(data) {
                body.push(data);
                body_len += data.length;
                // 1e6 === 1 * Math.pow(10, 7) === 1 * 10,000,000 ~~~ 10MB
                if (body_len > 1e7) {
                    // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                    req.connection.destroy();
                }
            });
            req.on('end', function() {
//                console.log(body);
                // load the xml send in POST body and extract the redirect URL value
                var doc_str = String(Buffer.concat(body));
                var xml = new dom().parseFromString(doc_str);
                var proxy_to = xpath.select("//proxy/redirect_url/text()", xml)[0].toString();


                // TODO: is cache-replay enabled?

                // remove the password token info from the request before we generate the hash value (so it is consistent between different logins)
                var hashstr = [];
                var temp = xpath.select("//security/domain/text()", xml)[0].toString();
                hashstr.push(temp);
                var temp = xpath.select("//security/username/text()", xml)[0].toString();
                hashstr.push(temp);
                var token = "<message_body";
                var pos_start = doc_str.search(token);
                token = "</message_body>";
                var pos_end = doc_str.search(token);
                var temp = doc_str.substr(pos_start, pos_end - pos_start - token.length);
                hashstr.push(temp);

                //  [YES] TODO: analyze the request portion of the i2b2 message and compute a hash value.
                //          check our local database for a record that has a matching request cache value
                //          if found then serve up the cached result (remember to replace the security token)


                // forward the request to the redirect URL
                proxy_to = url.parse(proxy_to);
                var client_ip = req.connection.remoteAddress ||
                                req.socket.remoteAddress ||
                                req.connection.socket.remoteAddress;

                var headers = {};
                _.forEach(req.headers, (value, key) => {
                    headers[key] = value;
                });
                headers["Content-Type"] = 'text/xml';
//                headers["via"] = 'i2b2 Overlay Server Proxy';
//                headers["forwarded"] = `for=${client_ip}`;
//                headers["x-forwarded-for"] = client_ip;
                delete headers['cookie'];
                delete headers['host'];
                delete headers['origin'];
                delete headers['referer'];
                delete headers['content-length'];

                var opts = {
                    hostname: proxy_to.hostname,
                    port: proxy_to.port,
                    path: proxy_to.path,
                    method: req.method,
                    headers: headers
                }
                if (opts['port'] === null) delete opts['port'];

                var i2b2_result = [];
                const proxy_request = http.request(opts, (proxy_res) => {
                    res.statusCode = proxy_res.statusCode;
                    _.forEach(proxy_res.headers, (value, key) => {
                        res.setHeader(key, value);
                    });
                    res.removeHeader('set-cookie');
                    res.setHeader('Content-Type', 'text/xml');
                    proxy_res.on('data', (chunk) => {
                        i2b2_result.push(chunk);
                    });
                    proxy_res.on('end', () => {
                        res.end(Buffer.concat(i2b2_result));
                    });
                });

                proxy_request.on('error', (e) => {
                    console.error(`problem with request: ${e.message}`);
                    res.end(String(Buffer.concat(i2b2_result)));
                });

                body = String(Buffer.concat(body));
                proxy_request.setHeader('Content-Type', 'text/xml');
                proxy_request.setHeader('Content-Length', body.length);
                proxy_request.end(body);

            })
        }
    }).bind(this);



}

ProxyEngine.prototype.start = function() {
    console.log(colors.green.inverse("STARTUP") + colors.gray(" of proxy engine has been initiated..."));
};
ProxyEngine.prototype.stop = function() {
    console.log(colors.red.inverse("SHUTDOWN") + colors.gray(" of proxy engine has been initiated..."));
};
ProxyEngine.prototype.getRouter = function() {
    return this.router;
};
ProxyEngine.prototype.cacheEngine = function() {
    return this.cacheEngine;
};

ProxyCacheEngine.prototype.CacheToDB = function() {
    return this.router;
};
ProxyCacheEngine.prototype.ServeFromDB = function() {
    return this.router;
};
ProxyCacheEngine.prototype.cacheListMsgs = function(filter) {
    return this.router;
};
ProxyCacheEngine.prototype.cacheGetMsg = function(msg_id) {
    return this.router;
};

ProxyCacheEngine.prototype.cacheGetMsg


module.exports = ProxyEngine;
