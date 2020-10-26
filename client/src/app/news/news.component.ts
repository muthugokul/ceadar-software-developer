import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";

import { News } from "./models/news.model";
import { NewsService } from "./services/new.service";
import { ISortByCriteria } from "./services/pipe/sort.pipe";

@Component({
    templateUrl: "./news.component.html"
})

export class NewsComponent implements OnInit {
    sortCriteria: ISortByCriteria

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

    sort(): void {
        if (!this.sortCriteria) {
            this.sortCriteria = {
                column: "time",
                isAscending: true
            } as ISortByCriteria
        }

        this.sortCriteria = {
            column: this.sortCriteria.column,
            isAscending: !this.sortCriteria.isAscending
        } as ISortByCriteria;
    }
}
