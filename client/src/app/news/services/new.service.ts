import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WebSocketSubject } from "rxjs/webSocket";

import { WS_URL } from "../../api.token";
import { News } from "../models/news.model";

@Injectable()
export class NewsService {
    private wsSubject: WebSocketSubject<any>;

    private get webSocketSubject(): WebSocketSubject<any> {
        const isSocketClosed = !this.wsSubject || this.wsSubject.closed;

        if (isSocketClosed) {
            this.wsSubject = new WebSocketSubject(this.webSocketUrl);
        }

        return this.wsSubject;
    }

    constructor(@Inject(WS_URL) private webSocketUrl: string ) {
    }

    get(): Observable<News[]> {
        return this.webSocketSubject.asObservable();
    }

    update(news: News): void {
        if (news) {
            this.webSocketSubject.next(JSON.stringify(news));
        }
    }
}
