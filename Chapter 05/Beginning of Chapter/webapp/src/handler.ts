import { IncomingMessage, ServerResponse } from "http";
export const handler = async (req: IncomingMessage, resp: ServerResponse) => {
    console.log(`user-agent: ${req.headers["user-agent"]}`);
    console.log(`---- HTTP Method: ${req.method}, URL: ${req.url}`);
    const parsedURL = new URL(req.url ?? "", `http://${req.headers.host}`);
    console.log(`protocol: ${parsedURL.protocol}`);
    console.log(`hostname: ${parsedURL.hostname}`);
    console.log(`port: ${parsedURL.port}`);
    console.log(`pathname: ${parsedURL.pathname}`);
    parsedURL.searchParams.forEach((val, key) => {
        console.log(`Search param: ${key}: ${val}`)
    });
    console.log(parsedURL);
    //resp.writeHead(404,'Missing data');
    resp.write('Hello there.\n')
    resp.end("Hello, World");
};
