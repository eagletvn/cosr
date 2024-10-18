#!/usr/bin/env node
'use strict';
const cors_proxy = require('cors-anywhere');

// Opsi server CORS-Anywhere
const options = {
  originWhitelist: [], // Mengizinkan semua origin
  removeHeaders: ['cookie', 'cookie2'],
  handleInitialRequest: (req, res, location) => {
    // Cek jika root URL diakses (tidak ada URL target)
    if (!location) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Invalid request. No URL provided.');
      return true; // Menghentikan proses lebih lanjut
    }
    return false; // Jika ada URL valid, teruskan ke proxy
  }
};

// Membuat server CORS proxy dengan opsi
const server = cors_proxy.createServer(options);

module.exports = (req, res) => {
  console.log('headers', req.headers);
  console.log('url', req.url);

  // Pastikan URL valid sebelum meneruskan ke proxy
  if (!req.url || req.url === "/") {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Invalid request. No URL provided.');
    return;
  }

  // Menjalankan proxy
  server.emit('request', Object.assign(req, { url: req.url.replace(':/', '://') }), res);
};
