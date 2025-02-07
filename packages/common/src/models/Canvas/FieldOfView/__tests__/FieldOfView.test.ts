import FieldOfView from "../FieldOfView";
import { describe, expect, test } from "vitest";

describe("Тестирование класса FieldOfView", () => {
    test("должен правильно инициализировать FieldOfView с положительными значениями x, y и масштаба", () => {
        const fieldOfViewData = { x: 10, y: 20, scale: 1.5 };
        const fieldOfView = new FieldOfView(fieldOfViewData);

        expect(fieldOfView.x).toBe(fieldOfViewData.x);
        expect(fieldOfView.y).toBe(fieldOfViewData.y);
        expect(fieldOfView.scale).toBe(fieldOfViewData.scale);
        expect(fieldOfView.fieldOfView).toEqual(fieldOfViewData);
    });

    test("должен корректно инициализировать FieldOfView с отрицательными значениями x, y и масштаба", () => {
        const fieldOfViewData = { x: -10, y: -20, scale: -1.5 };
        const fieldOfView = new FieldOfView(fieldOfViewData);

        expect(fieldOfView.x).toBe(fieldOfViewData.x);
        expect(fieldOfView.y).toBe(fieldOfViewData.y);
        expect(fieldOfView.scale).toBe(fieldOfViewData.scale);
        expect(fieldOfView.fieldOfView).toEqual(fieldOfViewData);
    });

    test("должен корректно инициализировать FieldOfView с нулевыми значениями x, y и масштаба", () => {
        const fieldOfViewData = { x: 0, y: 0, scale: 0 };
        const fieldOfView = new FieldOfView(fieldOfViewData);

        expect(fieldOfView.x).toBe(fieldOfViewData.x);
        expect(fieldOfView.y).toBe(fieldOfViewData.y);
        expect(fieldOfView.scale).toBe(fieldOfViewData.scale);
        expect(fieldOfView.fieldOfView).toEqual(fieldOfViewData);
    });

    test("должен возвращать правильный объект fieldOfView после инициализации", () => {
        const fieldOfViewData = { x: 5, y: 15, scale: 2.0 };
        const fieldOfView = new FieldOfView(fieldOfViewData);

        const expectedFieldOfView = {
            x: 5,
            y: 15,
            scale: 2.0,
        };

        expect(fieldOfView.fieldOfView).toEqual(expectedFieldOfView);
    });

    test("должен возвращать правильный объект fieldOfView после изменения значений x, y и масштаба", () => {
        const fieldOfViewData = { x: 5, y: 15, scale: 2.0 };
        const fieldOfView = new FieldOfView(fieldOfViewData);

        fieldOfView.x = 10;
        fieldOfView.y = 20;
        fieldOfView.scale = 1.5;

        const expectedFieldOfView = {
            x: 10,
            y: 20,
            scale: 1.5,
        };

        expect(fieldOfView.fieldOfView).toEqual(expectedFieldOfView);
    });
});
