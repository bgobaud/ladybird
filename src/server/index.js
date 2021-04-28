"use strict";
const server = require("./server");
const config = require("../config.json");

const run = () => {
  server.serverRun(config.port);
};

run();
