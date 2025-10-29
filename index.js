#!/usr/bin/env node
'use strict';

const cors_proxy = require('cors-anywhere');

const options = {
  originWhitelist: [], // Allow all origins
  removeHeaders: ['cookie', 'cookie2']
};

const server = cors_proxy.createServer(options);

module.exports = (req, res) => {
  console.log('headers', req.headers);
  console.log('url', req.url);
  server.emit('request', Object.assign(req, { url: req.url.replace(':/', '://') }), res);
};
