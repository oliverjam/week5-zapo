const path = require('path');
const fs = require('fs');
const serveAPI = require('./serveAPI.js');

const handlers = module.exports = {};

handlers.serveLanding = (request, response) => {
  fs.readFile(path.join(__dirname, '..', '..', 'public', 'index.html'), (err, file) => {
    if (err) {
      response.writeHead(500, { 'Content-Type': 'text/html' });
      response.write(`<h1>500 Server Error:</h1><h2>${err}</h2>`);
      response.end();
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(file);
    }
  });
};

handlers.servePublic = (request, response, url) => {
  fs.readFile(path.join(__dirname, '..', '..', 'public', url), (err, file) => {
    if (err) {
      response.writeHead(500, { 'Content-Type': 'text/html' });
      response.write(`<h1>500 Server Error:</h1><h2>${err.message}</h2>`);
      response.end();
    } else {
      const extension = request.url.split('.')[1];
      const extensionType = {
        html: 'text/html',
        css: 'text/css',
        js: 'application/javascript',
        ico: 'image/x-icon',
        png: 'image/png',
        svg: 'image/svg+xml',
      };
      response.writeHead(200, { 'Content-Type': extensionType[extension] });
      response.end(file);
    }
  });
};

handlers.pageNotFound = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write('<h1>404 Page requested cannot be found</h1>');
  response.end();
};

handlers.serveAPI = serveAPI;
