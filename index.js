#!/usr/bin/env node
'use strict';
const options = {
  originWhitelist: [], // Membolehkan semua asal (origin)
  removeHeaders: ['cookie', 'cookie2']
};
const cors_proxy = require('cors-anywhere').createServer(options);

module.exports = (req, res) => {
  console.log('headers', req.headers);
  console.log('url', req.url);

  // Cek jika URL tidak valid atau root ("/")
  if (!req.url || req.url === "/") {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Invalid request. No URL provided.');
    return;
  }

  // Jika URL valid, teruskan ke cors-anywhere proxy
  cors_proxy.emit('request', Object.assign(req, {url: req.url.replace(':/', '://')}), res);
};
