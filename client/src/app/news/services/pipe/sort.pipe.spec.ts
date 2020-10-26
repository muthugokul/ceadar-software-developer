import { News } from "../../models/news.model";
import { ISortByCriteria, SortPipe } from "./sort.pipe";

fdescribe("Sort pipe", () => {
    let target: SortPipe<News>;

    let newsArray: News[];
    let sortByCriteria: ISortByCriteria;

    beforeEach(() => {
        sortByCriteria = {
            column: "date"
        } as ISortByCriteria;

        newsArray = [
            new News(
                undefined,
                "A better way to invest in the Covid-19 vaccine gold rush",
                " 7:51 PM ET Fri, 17 July 2020",
                new Date("Fri 17 July 2020 7:51 PM"),
                "description"),
            new News(
                undefined,
                "A better way to invest in the Covid-19 vaccine gold rush",
                " 7:00 PM ET Fri, 17 July 2020",
                new Date("Fri 17 July 2020 7:00 PM"),
                "description"),
        ];

        target = new SortPipe<News>();
    });

    describe("transform", () => {
        it("should return undefined if news is null", () => {
            expect(target.transform(null, sortByCriteria)).toBeNull();
        });

        it("should return epected news if sort cretiria is null", () => {
            expect(target.transform(newsArray, null)).toBe(newsArray);
        });

        it("should sort news by time in ascending order", () => {
            sortByCriteria.isAscending = true;
            const results = target.transform(newsArray, sortByCriteria);

            expect(results.length).toBe(2);
            expect(results[0].time).toBe(newsArray[1].time);
        });

        it("should sort news by time in descending order", () => {
            sortByCriteria.isAscending = false;
            const results = target.transform(newsArray, sortByCriteria);

            expect(results.length).toBe(2);
            expect(results[0].time).toBe(newsArray[0].time);
        });
    });
});
