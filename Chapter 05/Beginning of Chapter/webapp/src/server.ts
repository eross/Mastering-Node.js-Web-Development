import { createServer } from "http";
import { handler } from "./handler";
const port = 3000;
const server = createServer();
server.on("request", handler);
server.listen(port);
server.on("listening", () => {
    console.log(`(Event) Server listening on port ${port}`);
});