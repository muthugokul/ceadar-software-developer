import * as http from "http";
import * as ws from "ws";

import { NewsEvent } from "./models/news.event";
import { clearNewsCache, getNews, updateNews } from "./new-db";

export function createNewsWebSocket(httpServer: http.Server): NewsWebSocket {
    const newsServer = new NewsWebSocket(httpServer);

    return newsServer;
}

export class NewsWebSocket {
    private readonly wsServer: ws.Server;

    constructor(server: http.Server) {
        NewsEvent.watchNews.emit("startWatch");

        this.wsServer = new ws.Server({ server });
        this.wsServer.on("connection", (webSocket: ws) => this.onConnection(webSocket));

        NewsEvent.fileChanged.addListener("fileChanged", this.handleLatestNews.bind(this));
    }

    private handleLatestNews(): void {
        clearNewsCache();
        this.sendNews();
    }

    private sendNews(): void {
        getNews().then(news => {
            this.wsServer.clients.forEach(ws => {
                ws.send(JSON.stringify(news));
            });
        });
    }

    private onConnection(ws: ws): void {
        ws.on("message", (message: string) => this.onMessage(message));
        ws.on("error", (error: Error) => this.onError(error));
        ws.on("close", () => this.onClose());

        this.sendNews();
    }

    private onMessage(message: string): void {
        if (message) {
            updateNews(JSON.parse(message));
        }
    }

    private onClose(): void {
        console.log(`Connections count: ${this.wsServer.clients.size}`);
    }

    private onError(error: Error): void {
        console.error(`WebSocket error: "${error.message}"`);
    }
}