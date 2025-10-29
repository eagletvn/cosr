#!/usr/bin/env node
'use strict';

const cors_proxy = require('cors-anywhere');

// Konfigurasi proxy
const host = '0.0.0.0';
const port = process.env.PORT || 8080;

cors_proxy.createServer({
  originWhitelist: [], // izinkan semua origin
  removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, () => {
  console.log(`CORS Anywhere server running on ${host}:${port}`);
});
