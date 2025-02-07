import { v4 } from "uuid";

interface IEventBusListener<T = any> {
    id: string;
    type: string;
    callback: (payload: T) => void;
}

export class EventBus {
    listeners: IEventBusListener[] = [];

    add<K>(type: string, callback: (payload: K) => void, id?: string) {
        const listener = { id: id ?? v4(), type, callback };
        this.listeners.push(listener);
        return listener;
    }

    async dispatch<T>(type: string, payload?: T) {
        return new Promise<null>((resolve) => {
            this.listeners
                .filter((item) => item.type === type)
                .forEach((item) => item.callback(payload));
            resolve(null);
        });
    }

    remove(id: string) {
        this.listeners = this.listeners.filter((item) => item.id !== id);
    }
}
