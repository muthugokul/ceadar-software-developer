import events = require("events");

export class NewsEvent {
    static fileChanged = new events.EventEmitter();
    static watchNews = new events.EventEmitter();
}