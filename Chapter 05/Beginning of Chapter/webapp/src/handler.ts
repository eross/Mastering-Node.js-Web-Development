import { IncomingMessage, ServerResponse } from "http";
export const handler = async (req: IncomingMessage, resp: ServerResponse) => {
    console.log(req);
    resp.end("Hello, World");
};
