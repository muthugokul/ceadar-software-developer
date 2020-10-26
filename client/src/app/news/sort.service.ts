export class Sort<T> {
    insertionSort(
        array: T[],
        compare: { (prev: T, curr: T): number } = (prev: any, curr: any) => prev - curr): T[] {
            var current: T;
            var j: number;

            for (var i = 1; i < array.length; i += 1) {
                current = array[i];
                j = i - 1;

                while (j >= 0 && compare(array[j], current) > 0) {
                    array[j + 1] = array[j];
                    j -= 1;
                }
                array[j + 1] = current;
            }
        return array;
    }
}
