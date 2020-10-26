import { Pipe, PipeTransform } from "@angular/core";

export interface ISortByCriteria {
    column: string;
    isAscending?: boolean
}

const sortByCriteriaDefault: ISortByCriteria = {
    column: "date",
    isAscending: false
}

@Pipe({
    name: "sort"
})

export class SortPipe<T> implements PipeTransform {
    private options: ISortByCriteria;

    transform(array: T[], sortByCriteria: ISortByCriteria): T[] {
        if (!array || !sortByCriteria || !sortByCriteria.column) {
            return array;
        }

        this.options = { ...sortByCriteriaDefault, ...sortByCriteria };

        const sortByColumn = this.options.column;

        for (let i = 1; i < array.length; i++) {
            
            // take first element
            let current = array[i];

            // take last element of internal sorted array
            let j = i - 1;

            while ((j > -1) && (this.compare(current[sortByColumn], array[j][sortByColumn], sortByCriteria.isAscending))) {
                array[j + 1] = array[j];
                j--;
            }

            array[j + 1] = current;
        }
        
        return array;
    }

    private compareDate(current: Date, previous: Date): number {
        if (current.getTime() > previous.getTime()) {
            return 1;
        } else {
            return -1;
        } 
    }

    private compare(current: Date, previous: Date, isAscending: boolean): boolean {
        const vlaue = this.compareDate(current, previous)
        if (isAscending) {
            return vlaue == -1;
        } else {
            return vlaue == 1;
        }
    }
}
