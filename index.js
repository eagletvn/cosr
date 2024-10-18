#!/usr/bin/env node
'use strict'; 

const cors_proxy = require('cors-anywhere');

// Opsi server CORS-Anywhere
const options = {
  originWhitelist: [], // Mengizinkan semua origin
  removeHeaders: ['cookie', 'cookie2'],
  // Custom handler untuk menangani permintaan
  requireHeader: [],
  handleInitialRequest: (req, res, location) => {
    // Jika tidak ada URL yang diberikan, tangani sebagai permintaan tidak valid
    if (!location) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Invalid request. No URL provided.'); // Ubah ini sesuai kebutuhan
      return true; // Menghentikan proses lebih lanjut
    }
    return false; // Jika ada URL valid, teruskan ke proxy
  }
};

// Membuat server CORS proxy dengan opsi
const server = cors_proxy.createServer(options);

// Menangani permintaan
module.exports = (req, res) => {
  console.log('headers', req.headers);
  console.log('url', req.url);

  // Menghilangkan penanganan default untuk root URL
  if (!req.url || req.url === "/") {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Invalid request. No URL provided.');
    return;
  }

  // Jalankan proxy
  server.emit('request', Object.assign(req, { url: req.url.replace(':/', '://') }), res);
};
