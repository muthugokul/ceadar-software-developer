import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { environment } from "src/environments/environment";

import { WS_URL } from "./api.token";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NewsDetailComponent } from "./news/news-detail.component";
import { NewsEditComponent } from "./news/news-edit.component";
import { NewsComponent } from "./news/news.component";
import { NewsService } from "./news/services/new.service";
import { NewsEventService } from "./news/services/news-event.service";
import { SortPipe } from "./news/services/pipe/sort.pipe";

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    NewsDetailComponent,
    NewsEditComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    NewsService,
    NewsEventService,
    { provide: WS_URL, useValue: environment.WS_URL }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
