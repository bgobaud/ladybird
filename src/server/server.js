"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

const servePage = (staticPath, contentType, res) => {
  const filePath = path.join(__dirname, staticPath);

  res.writeHead(200, {
    "Content-Type": contentType,
  });

  fs.createReadStream(filePath).pipe(res);
};

// Create server
const serverRun = (port) => {
  http
    .createServer((req, res) => {
      // Home page
      if (req.url === "/" || req.url.startsWith("/index.htm")) {
        servePage("../../static/index.htm", "text/html; charset=utf-8", res);
      }

      // Stylesheet
      if (req.url === "/style.css") {
        servePage("../../static/style.css", "text/css; charset=utf-8", res);
      }

      // Filter js file
      if (req.url === "/filter.js") {
        servePage(
          "../../static/filter.js",
          "text/javascript; charset=utf-8",
          res
        );
      }

      // Filter js file
      if (req.url === "/index.js") {
        servePage(
          "../../static/index.js",
          "text/javascript; charset=utf-8",
          res
        );
      }

      // Data json file
      if (req.url === "/data.json") {
        servePage(
          "../../static/data.json",
          "application/json; charset=utf-8",
          res
        );
      }
    })
    .listen(port);
};

module.exports = {
  serverRun,
};
