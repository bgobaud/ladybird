"use strict";
const server = require("./server");
const config = require("../config.json");

/**
 * Run the HTTP server
 */
const run = () => {
  server.serverRun(config.port);
};

run();
