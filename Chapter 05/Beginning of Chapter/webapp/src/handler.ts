import { IncomingMessage, ServerResponse } from "http";
import { TLSSocket } from "tls";
import { URL } from "url";
export const isHttps = (req: IncomingMessage) : boolean => {
    return req.socket instanceof TLSSocket && req.socket.encrypted;
}

export const redirectionHandler
        = (req: IncomingMessage, resp: ServerResponse) => {
    resp.writeHead(302, {
        "Location": "https://localhost:3443"
    });
    resp.end();
}

export const handler = async (req: IncomingMessage, resp: ServerResponse) => {
    const parsedURL = new URL(req.url ?? "", `http://${req.headers.host}`);
    if (req.method !== "GET" || parsedURL.pathname == "/favicon.ico") {
        resp.writeHead(404, "Not Found");
        resp.end();
        return;
    } else {
        resp.writeHead(200, "OK");
        if (!parsedURL.searchParams.has("keyword")) {
            resp.write("Hello, HTTP");
        } else {
            resp.write(`Hello, ${parsedURL.searchParams.get("keyword")}`);
        }
        resp.end();
        return;       
    }
};