"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (req, resp) => {
    console.log(req);
    resp.end("Hello, World");
};
exports.handler = handler;
