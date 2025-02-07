export class CustomMap<K, V> extends Map<K, V> {
    moveToEnd(key: K): void {
        if (!this.has(key)) {
            throw new Error(`Key "${key}" does not exist in the map.`);
        }
        const value = this.get(key);
        if (!value) {
            throw new Error(`Value for key "${key}" is undefined.`);
        }
        this.delete(key);
        this.set(key, value);
    }

    moveToStart(key: K): void {
        if (!this.has(key)) {
            throw new Error(`Key "${key}" does not exist in the map.`);
        }
        const value = this.get(key);
        if (!value) {
            throw new Error(`Value for key "${key}" is undefined.`);
        }
        this.delete(key);
        const newMap = new Map([[key, value], ...this]);
        this.clear();
        newMap.forEach((v, k) => this.set(k, v));
    }

    moveToUp(key: K): void {
        if (!this.has(key)) {
            throw new Error(`Key "${key}" does not exist in the map.`);
        }
        const entries = Array.from(this.entries());
        const index = entries.findIndex(([k]) => k === key);

        if (index === -1) {
            throw new Error(`Key "${key}" does not exist in the map.`);
        }

        if (index === 0) {
            throw new Error(`Key "${key}" is already at the top of the map.`);
        }

        [entries[index - 1], entries[index]] = [entries[index], entries[index - 1]];

        this.clear();
        entries.forEach(([k, v]) => this.set(k, v));
    }

    moveToDown(key: K): void {
        if (!this.has(key)) {
            throw new Error(`Key "${key}" does not exist in the map.`);
        }
        const entries = Array.from(this.entries());
        const index = entries.findIndex(([k]) => k === key);

        if (index === -1) {
            throw new Error(`Key "${key}" does not exist in the map.`);
        }

        if (index === entries.length - 1) {
            throw new Error(`Key "${key}" is already at the bottom of the map.`);
        }

        [entries[index], entries[index + 1]] = [entries[index + 1], entries[index]];

        this.clear();
        entries.forEach(([k, v]) => this.set(k, v));
    }

    isKeyAtTop(key: K): boolean {
        const entries = Array.from(this.entries());
        const index = entries.findIndex(([k]) => k === key);
        return index === 0;
    }

    isKeyAtBottom(key: K): boolean {
        const entries = Array.from(this.entries());
        const index = entries.findIndex(([k]) => k === key);
        return index === entries.length - 1;
    }
}
