import fs = require("fs");

import { newAPIUrl } from "../api.token";
import { NewsEvent } from "./models/news.event";

export function createNewsWatcher(): void {
    const neswsWatcher = new NeswsWatcher();

    return neswsWatcher.start();
}

export class NeswsWatcher {
    constructor() {
        NewsEvent.watchNews.addListener("startWatch", this.startWatch.bind(this));
    }

    start() {
        let fswait = false;

        fs.watch(newAPIUrl, (event, filename) => {
            if (filename) {
                if (fswait) return;

                setTimeout(() => {
                    fswait = false;
                }, 100);

                fswait = true;
                this.listen();
            }
        });
    }

    listen(): void {
        NewsEvent.fileChanged.emit("fileChanged");
    }

    private startWatch(): void {
        this.start();
    }
}