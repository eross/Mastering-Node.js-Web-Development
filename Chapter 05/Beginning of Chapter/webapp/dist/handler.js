"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.redirectionHandler = exports.isHttps = void 0;
const tls_1 = require("tls");
const url_1 = require("url");
const isHttps = (req) => {
    return req.socket instanceof tls_1.TLSSocket && req.socket.encrypted;
};
exports.isHttps = isHttps;
const redirectionHandler = (req, resp) => {
    resp.writeHead(302, {
        "Location": "https://localhost:3443"
    });
    resp.end();
};
exports.redirectionHandler = redirectionHandler;
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
            resp.write("Hello, HTTP");
        }
        else {
            resp.write(`Hello, ${parsedURL.searchParams.get("keyword")}`);
        }
        resp.end();
        return;
    }
};
exports.handler = handler;
