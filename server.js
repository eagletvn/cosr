#!/usr/bin/env node
'use strict';

const cors_proxy = require('cors-anywhere');

const options = {
  originWhitelist: [], // allow all
  requireHeader: [],   // <= tambahkan baris ini
  removeHeaders: ['cookie', 'cookie2']
};

const server = cors_proxy.createServer(options);

module.exports = (req, res) => {
  server.emit('request', Object.assign(req, { url: req.url.replace(':/', '://') }), res);
};
