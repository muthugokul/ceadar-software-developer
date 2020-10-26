import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
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
        return this.webSocketSubject.asObservable().pipe(
            map(x => this.mapToNews(x)));
    }

    update(news: News): void {
        if (news) {
            this.webSocketSubject.next(JSON.stringify(news));
        }
    }

    private mapToNews(response: any[]): News[] {
        const newsArray: News[] = [];

        if (response && response.length) {
            response.forEach(item => {
                const date = this.ConvertToDate(item.time);
                newsArray.push(new News(item.id, item.headlines, item.time, date, item.description));
            })
        }

        return newsArray;
    }

    private ConvertToDate(value: string): Date {
        if (value) {
            const dateTime = value.trim().split("ET");

            return new Date(`${dateTime[1].trim()}  ${dateTime[0].trim()}`);
        }
    }
}
