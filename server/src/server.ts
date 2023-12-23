import 'dotenv/config';
import https from 'https';

import dbconnect from './db/mongoose';
import httpsConfig from './config/https/https.config';

import app from './app';

/*
  1. INITIALIZE SERVER
*/
const PORT = process.env.APP_PORT || 3000;
const server = https.createServer(httpsConfig, app);

/*
  2. APPLICATION BOOT UP
*/
server.on('ready', () => {
  server.listen(PORT, () => {
    console.log(`App running on Port: ${PORT}`);
  });
});

dbconnect.then(() => {
  server.emit('ready');
});
