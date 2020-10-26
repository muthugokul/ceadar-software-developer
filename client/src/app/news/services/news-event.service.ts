import { EventEmitter, Injectable } from "@angular/core";

import { News } from "../models/news.model";

@Injectable()
export class NewsEventService {
    saveNews = new EventEmitter<News>();
    cancelNewsEdit = new EventEmitter<News>();
}
