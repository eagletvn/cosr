#!/usr/bin/env node
'use strict';

const cors_proxy = require('cors-anywhere');

// Opsi server CORS-Anywhere
const options = {
  originWhitelist: [], // Mengizinkan semua origin
  removeHeaders: ['cookie', 'cookie2'],
  requireHeader: [], // Memastikan tidak ada header yang diperlukan
};

// Membuat server CORS proxy dengan opsi
const server = cors_proxy.createServer(options);

// Menangani permintaan
module.exports = (req, res) => {
  console.log('headers', req.headers);
  console.log('url', req.url);

  // Memeriksa apakah URL adalah root
  if (req.url === "/" || req.url === "") {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found'); // Ubah pesan sesuai keinginan
    return;
  }

  // Jalankan proxy
  server.emit('request', Object.assign(req, { url: req.url.replace(':/', '://') }), res);
};
