import csv = require("csv-parser");
import createCsvWriter = require("csv-writer");
import * as fs from "fs";
import Guid = require("guid");

import { newAPIUrl } from "../api.token";
import { News } from "./models/news.model";

let newsArray: News[];

const csvWriter = createCsvWriter.createObjectCsvWriter({
    path: newAPIUrl,
    header: [
        { id: "headlines", title: "Headlines" },
        { id: "time", title: "Time" },
        { id: "description", title: "Description" },
    ]
});

export function getNews(): Promise<News[]> {
    if (newsArray) {
        return new Promise<News[]>((resolve, reject) => resolve(filter(newsArray)));
    }

    return readNewsFromCsv();
}

export function updateNews(item: any): Promise<any> {
    const newsObject = JSON.parse(item);

    const news = newsArray.find(x => x.id === newsObject.id);

    if (news) {
        news.time = newsObject.time;
        news.headlines = newsObject.headlines;
        news.description = newsObject.description;
    }

    return csvWriter.writeRecords(newsArray);
}

export function clearNewsCache(): void {
    newsArray = null;
}

function readNewsFromCsv(): Promise<News[]> {
    newsArray = [];

    const readStream = fs.createReadStream(newAPIUrl).pipe(csv());
    
    return new Promise((resolve, reject) => {
        readStream
            .on("data", item => {
                newsArray.push(new News(Guid.raw(), item["Headlines"], item["Time"], item["Description"]));
            }).on("end", () => {
                readStream.destroy();
                resolve(filter(newsArray));
            }).on("close", () => console.log("Stream closed"));
        });
}

function filter(newsArray: News[]): News[] {
    return newsArray.filter(x => x.time !== "");
}