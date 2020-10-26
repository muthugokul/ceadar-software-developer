import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { News } from "./models/news.model";
import { NewsEventService } from "./services/news-event.service";

@Component({
    selector: "app-news-details",
    templateUrl: "./news-detail.component.html"
})

export class NewsDetailComponent implements OnInit {
    @Input() news: News;
    @Input() parentForm: FormGroup;

    editMode = false;

    constructor(private newsEventService: NewsEventService) {
    }

    ngOnInit(): void {
        this.newsEventService.cancelNewsEdit.subscribe(() => this.editMode = false);
        this.newsEventService.saveNews.subscribe(() => this.editMode = false);
    }

    edit(): void {
        this.editMode = true;
    }

    cancel(): void {
        this.editMode = false;
    }
}
