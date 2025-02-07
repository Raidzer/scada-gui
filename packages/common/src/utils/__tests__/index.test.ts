import { describe, expect, test } from "vitest";
import { filterExcludeNull } from "..";

describe("Тестирование утилит", () => {
    describe("filterExcludeNull", () => {
        test("Должен возвращать пустой массив, если входной массив пуст", () => {
            const input: any[] = [];
            const result = filterExcludeNull(input);
            expect(result).toEqual([]);
        });

        test("Должен возвращать массив без нулевых значений, если входные данные содержат нулевые значения", () => {
            const input = [1, null, 2, null, 3];
            const result = filterExcludeNull(input);
            expect(result).toEqual([1, 2, 3]);
        });

        test("Должен возвращать массив без неопределенных значений, если входные данные содержат неопределенные значения", () => {
            const input = [undefined, { key: "value" }, undefined];
            const result = filterExcludeNull(input);
            expect(result).toEqual([{ key: "value" }]);
        });

        test("Должен возвращать массив без нулевых и неопределенных значений, если входные данные содержат как нулевые, так и неопределенные значения", () => {
            const input = [1, null, 2, undefined, 3, null];
            const result = filterExcludeNull(input);
            expect(result).toEqual([1, 2, 3]);
        });

        test("Should return the same array when input contains no null or undefined values", () => {
            const input = [{ a: 1 }, { b: 2 }, { c: 3 }];
            const result = filterExcludeNull(input);
            expect(result).toEqual(input);
        });

        test("Should handle an array with mixed types including objects, null, and undefined", () => {
            const input = [{ a: 1 }, null, { b: 2 }, undefined, { c: 3 }];
            const result = filterExcludeNull(input);
            expect(result).toEqual([{ a: 1 }, { b: 2 }, { c: 3 }]);
        });

        test("Should handle an array with only null values", () => {
            const input = [null, null, null];
            const result = filterExcludeNull(input);
            expect(result).toEqual([]);
        });

        test("Should handle an array with only undefined values", () => {
            const input = [undefined, undefined, undefined];
            const result = filterExcludeNull(input);
            expect(result).toEqual([]);
        });

        test("Should handle an array with a single non-null and non-undefined object", () => {
            const input = [{ key: "value" }];
            const result = filterExcludeNull(input);
            expect(result).toEqual([{ key: "value" }]);
        });

        test("Should handle an array with a single null value", () => {
            const input = [null];
            const result = filterExcludeNull(input);
            expect(result).toEqual([]);
        });

        test("Should handle an array with a single undefined value", () => {
            const input = [undefined];
            const result = filterExcludeNull(input);
            expect(result).toEqual([]);
        });
    });
});
