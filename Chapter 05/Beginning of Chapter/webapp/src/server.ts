import { createServer } from "http";
import { handler, redirectionHandler } from "./handler";
import { createServer as createHttpsServer } from "https";
import { readFileSync } from "fs";

const port = 3000;
const https_port = 3443;

const server = createServer(redirectionHandler);

server.listen(port,
    () => console.log(`(Event) Server listening on port ${port}`));

const httpsConfig = {
    key: readFileSync("key.pem"),
    cert: readFileSync("cert.pem")
};

const httpsServer = createHttpsServer(httpsConfig, handler);

httpsServer.listen(https_port,
    () => console.log(`HTTPS Server listening on port ${https_port}`));