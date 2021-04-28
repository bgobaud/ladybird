"use strict";

const server = require("../../src/server/server");
const http = require("http");
const sinon = require("sinon");
const expect = require("expect");
const path = require("path");
const fs = require("fs");

let createServerCallback;

const testSinglePage = (description, url, staticFile, contentType) => {
  describe(`When called with ${description}`, () => {
    const filePath = "filePath";
    const req = {
      url,
    };
    const writeHeadStub = sinon.stub();
    const res = {
      writeHead: writeHeadStub,
    };

    let pathJoinStub;
    let createReadStreamStub;
    let pipeStub;

    before(() => {
      pathJoinStub = sinon.stub(path, "join");
      createReadStreamStub = sinon.stub(fs, "createReadStream");
      pipeStub = sinon.stub();
      pathJoinStub.returns(filePath);
      createReadStreamStub.returns({
        pipe: pipeStub,
      });
      createServerCallback(req, res);
    });

    after(() => {
      pathJoinStub.restore();
      createReadStreamStub.restore();
    });

    it("Should should call path join with correct parameter", () => {
      expect(pathJoinStub.callCount).toEqual(1);
      expect(pathJoinStub.args[0].length).toEqual(2);
      expect(pathJoinStub.args[0][1]).toEqual(staticFile);
    });
    it("should send the correct header", () => {
      expect(writeHeadStub.callCount).toEqual(1);
      expect(writeHeadStub.args[0].length).toEqual(2);
      expect(writeHeadStub.args[0][0]).toEqual(200);
      expect(writeHeadStub.args[0][1]).toEqual(contentType);
    });
    it("should call createReadStream on file path", () => {
      expect(createReadStreamStub.callCount).toEqual(1);
      expect(createReadStreamStub.args[0].length).toEqual(1);
      expect(createReadStreamStub.args[0][0]).toEqual(filePath);
    });
    it("Should pipe the file", () => {
      expect(pipeStub.callCount).toEqual(1);
      expect(pipeStub.args[0].length).toEqual(1);
      expect(pipeStub.args[0][0]).toEqual(res);
    });
  });
};

describe("server", () => {
  describe("runServer", () => {
    let createServerStub;
    let listenStub;

    before(() => {
      listenStub = sinon.stub();
      createServerStub = sinon.stub(http, "createServer");
      createServerStub.returns({
        listen: listenStub,
      });
      server.serverRun(12);
    });
    after(() => {
      createServerStub.restore();
    });

    it("should call listen on port given on argument", async () => {
      expect(listenStub.callCount).toEqual(1);
      expect(listenStub.args).toEqual([[12]]);
    });

    it("should call createServer with a callback Function (1 argument)", () => {
      expect(createServerStub.callCount).toEqual(1); // Called once
      expect(createServerStub.args[0].length).toEqual(1); // Called with 1 argument
      createServerCallback = createServerStub.args[0][0]; // First argument of the first call
    });

    describe("createServer callback function", () => {
      describe("On Home page", () => {
        // Test Home Page
        testSinglePage("Home page", "/", "../../static/index.htm", {
          "Content-Type": "text/html; charset=utf-8",
        });
      });

      describe("On style.css Stylesheet", () => {
        // Test Stylesheet
        testSinglePage("CSS file", "/style.css", "../../static/style.css", {
          "Content-Type": "text/css; charset=utf-8",
        });
      });

      describe("On JS filter.js file", () => {
        // test JS filter.js file
        testSinglePage(
          "JS filter.js File",
          "/filter.js",
          "../../static/filter.js",
          {
            "Content-Type": "text/javascript; charset=utf-8",
          }
        );
      });

      describe("On JS filter.js file", () => {
        // test JS filter.js file
        testSinglePage(
          "JS filter.js File",
          "/index.js",
          "../../static/index.js",
          {
            "Content-Type": "text/javascript; charset=utf-8",
          }
        );
      });

      describe("On JSON data.json file", () => {
        // test JSON data.json file
        testSinglePage(
          "JSON data.json File",
          "/data.json",
          "../../static/data.json",
          {
            "Content-Type": "application/json; charset=utf-8",
          }
        );
      });
    });
  });
});
