"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const url_1 = require("url");
const handler = async (req, resp) => {
    const parsedURL = new url_1.URL(req.url ?? "", `http://${req.headers.host}`);
    if (req.method !== "GET" || parsedURL.pathname == "/favicon.ico") {
        resp.writeHead(404, "Not Found");
        resp.end();
        return;
    }
    else {
        resp.writeHead(200, "OK");
        if (!parsedURL.searchParams.has("keyword")) {
            resp.write("Hello, HTTPx");
        }
        else {
            resp.write(`Hello, ${parsedURL.searchParams.get("keyword")}`);
        }
        resp.end();
        return;
    }
};
exports.handler = handler;
