import { IncomingMessage, ServerResponse } from "http";
import { URL } from "url";
export const handler = async (req: IncomingMessage, resp: ServerResponse) => {
    const parsedURL = new URL(req.url ?? "", `http://${req.headers.host}`);
    if (req.method !== "GET" || parsedURL.pathname == "/favicon.ico") {
        resp.writeHead(404, "Not Found");
        resp.end();
        return;
    } else {
        resp.writeHead(200, "OK");
        if (!parsedURL.searchParams.has("keyword")) {
            resp.write("Hello, HTTPx");
        } else {
            resp.write(`Hello, ${parsedURL.searchParams.get("keyword")}`);
        }
        resp.end();
        return;       
    }
};