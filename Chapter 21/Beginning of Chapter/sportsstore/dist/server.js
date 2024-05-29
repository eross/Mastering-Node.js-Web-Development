"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = require("./config");
const routes_1 = require("./routes");
const helpers_1 = require("./helpers");
const errors_1 = require("./errors");
const sessions_1 = require("./sessions");
const authentication_1 = require("./authentication");
const http_proxy_1 = __importDefault(require("http-proxy"));
const port = (0, config_1.getConfig)("http:port", 5000);
const expressApp = (0, express_1.default)();
expressApp.use((0, helmet_1.default)((0, config_1.getConfig)("http:content_security", {})));
expressApp.use(express_1.default.json());
expressApp.use(express_1.default.urlencoded({ extended: true }));
expressApp.use(express_1.default.static("node_modules/bootstrap/dist"));
expressApp.use(express_1.default.static("node_modules/bootstrap-icons"));
expressApp.use(express_1.default.static("node_modules/htmx.org/dist"));
(0, helpers_1.createTemplates)(expressApp);
(0, sessions_1.createSessions)(expressApp);
(0, authentication_1.createAuthentication)(expressApp);
(0, routes_1.createRoutes)(expressApp);
const server = (0, http_1.createServer)(expressApp);
if ((0, config_1.getEnvironment)() === config_1.Env.Development) {
    const proxy = http_proxy_1.default.createProxyServer({
        target: "http://localhost:5100", ws: true
    });
    expressApp.use("/admin", (req, resp) => proxy.web(req, resp));
    server.on('upgrade', (req, socket, head) => proxy.ws(req, socket, head));
}
(0, errors_1.createErrorHandlers)(expressApp);
server.listen(port, () => console.log(`HTTP Server listening on port ${port}`));
