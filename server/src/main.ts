import * as express from "express";
import { createServer } from "http";

import { createNewsWatcher } from "./news/news-watcher";
import { createNewsWebSocket } from "./news/news-websocket";

const app = express();
const server = createServer(app);

createNewsWatcher();
createNewsWebSocket(server);

server.listen(9090, "localhost", () => {
    console.log("Listening to localhost:9090");
})