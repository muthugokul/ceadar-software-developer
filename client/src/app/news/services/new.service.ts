import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators" 
import { WebSocketSubject } from "rxjs/webSocket";

import { News } from "../models/news.model";
import { WS_URL } from "../../api.token";

@Injectable()
export class NewsService {
    private _webSocketSubject: WebSocketSubject<any>;

    private get webSocketSubject(): WebSocketSubject<any> {
        const isSocketClosed = !this._webSocketSubject || this._webSocketSubject.closed;
        
        if (isSocketClosed) {
            this._webSocketSubject = new WebSocketSubject(this.webSocketUrl)
        }

        return this._webSocketSubject;
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