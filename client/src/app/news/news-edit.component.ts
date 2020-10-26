import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";

import { News } from "./models/news.model";
import { NewsService } from "./services/new.service";
import { NewsEventService } from "./services/news-event.service";

@Component({
    selector: "app-news-edit",
    templateUrl: "./news-edit.component.html"
})

export class NewsEditComponent implements OnInit {
    @Input() identifier: number;
    @Input() news: News;
    @Input() parentForm: FormGroup;

    @Output() cancelNewsEdit = new EventEmitter();

    formGroupIdentifier: string;
    newsEditFormGroup: FormGroup;

    get timeControl(): AbstractControl {
        return this.newsEditFormGroup.get("time") as AbstractControl;
    }

    get headlinesControl(): AbstractControl {
        return this.newsEditFormGroup.get("headlines") as AbstractControl;
    }

    get descriptionControl(): AbstractControl {
        return this.newsEditFormGroup.get("description") as AbstractControl;
    }

    constructor(
        private fb: FormBuilder,
        private newsEventService: NewsEventService,
        private newsService: NewsService) {
    }

    ngOnInit(): void {
        if (this.parentForm) {
            this.initializeEditForm();
            this.registerValueChanges();
        }
    }

    save(): void {
        this.newsService.update(this.news);
        this.newsEventService.saveNews.emit();
    }

    cancel(): void {
        this.newsEventService.cancelNewsEdit.emit();
    }

    private initializeEditForm(): void {
        this.formGroupIdentifier = `newsEditFormGroup${this.identifier}`;
        this.newsEditFormGroup = this.getFormGroup();
        this.parentForm.addControl(this.formGroupIdentifier, this.newsEditFormGroup);
    }

    private getFormGroup(): FormGroup {
        const formGroup = this.fb.group({
            time: ["", [Validators.required]],
            headlines: ["", [Validators.required]],
            description: ["", [Validators.required]]
        });

        return formGroup;
    }

    private registerValueChanges(): void {
        this.timeControl.setValue(this.news.time);
        this.headlinesControl.setValue(this.news.headlines);
        this.descriptionControl.setValue(this.news.description);

        this.timeControl.valueChanges.subscribe(x => this.news.time = x);
        this.headlinesControl.valueChanges.subscribe(x => this.news.headlines = x);
        this.descriptionControl.valueChanges.subscribe(x => this.news.description = x);

        this.newsEditFormGroup.updateValueAndValidity();
    }
}
