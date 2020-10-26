import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";

import { News } from "./models/news.model";
import { NewsService } from "./services/new.service";

@Component({
    templateUrl: "./news.component.html"
})

export class NewsComponent implements OnInit {

    news$: Observable<News[]>;
    newsFormGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
        private newsService: NewsService) {
            this.newsFormGroup = this.fb.group({});
    }

    ngOnInit(): void {
        this.news$ = this.newsService.get();
    }
}
