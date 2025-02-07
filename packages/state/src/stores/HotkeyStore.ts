import { makeAutoObservable } from "mobx";
import { KeyboardBinding } from "@scada/common";
import { KeyboardEventType } from "@scada/common";
import { InterceptEventType } from "@scada/common";
import { AppStore } from "./AppStore";

export class HotkeyStore {
    private store: AppStore;

    keyBindings: KeyboardBinding[] = [];

    constructor(store: AppStore) {
        this.store = store;
        makeAutoObservable(this);

        this.store.sharedEventBus.eventBus.add<any>(
            InterceptEventType.OnInterceptKeypress,
            (props: any) => this.handlePress(props),
        ),
            (document.onkeydown = function (e) {
                const keyCode = e.code;

                if (e.ctrlKey === true && keyCode === "KeyF") {
                    e.preventDefault();
                    return false;
                }
            });

        this.keyBindings = [
            new KeyboardBinding({
                inputKey: "ArrowLeft",
                useCtrl: true,
                eventName: KeyboardEventType.ArrowLeftWithCtrl,
                actionHandler: (eventName) => this.actionHandler(eventName),
            }),
            new KeyboardBinding({
                inputKey: "ArrowRight",
                useCtrl: true,
                eventName: KeyboardEventType.ArrowRightWithCtrl,
                actionHandler: (eventName) => this.actionHandler(eventName),
            }),
            new KeyboardBinding({
                inputKey: "ArrowUp",
                useCtrl: true,
                eventName: KeyboardEventType.ArrowUpWithCtrl,
                actionHandler: (eventName) => this.actionHandler(eventName),
            }),
            new KeyboardBinding({
                inputKey: "ArrowDown",
                useCtrl: true,
                eventName: KeyboardEventType.ArrowDownWithCtrl,
                actionHandler: (eventName) => this.actionHandler(eventName),
            }),
            new KeyboardBinding({
                inputKey: "Delete",
                useCtrl: true,
                eventName: KeyboardEventType.DeleteWithCtrl,
                actionHandler: (eventName) => this.actionHandler(eventName),
            }),
            new KeyboardBinding({
                inputKey: "Escape",
                eventName: KeyboardEventType.Escape,
                actionHandler: (eventName) => this.actionHandler(eventName),
            }),
            new KeyboardBinding({
                inputKey: "KeyZ",
                useCtrl: true,
                eventName: KeyboardEventType.KeyZWithCtrl,
                actionHandler: (eventName) => this.actionHandler(eventName),
            }),
            new KeyboardBinding({
                inputKey: "KeyY",
                useCtrl: true,
                eventName: KeyboardEventType.KeyYWithCtrl,
                actionHandler: (eventName) => this.actionHandler(eventName),
            }),
            new KeyboardBinding({
                inputKey: "KeyS",
                useCtrl: true,
                eventName: KeyboardEventType.KeySWithCtrl,
                actionHandler: (eventName) => this.actionHandler(eventName),
            }),
        ];

        window.addEventListener("keydown", (event: KeyboardEvent) => {
            this.keyboardHandler(event.code, event.ctrlKey, event.shiftKey, event.altKey, event);
        });
    }

    handlePress(event: any) {
        this.keyboardHandler(
            event.payload.code,
            event.payload.ctrlKey,
            event.payload.shiftKey,
            event.payload.altKey,
        );
    }

    actionHandler(eventName: string) {
        this.store.sharedEventBus.eventBus.dispatch(eventName);
    }

    keyboardHandler(
        inputKey: string,
        useControl: boolean,
        useShift: boolean,
        useAlt: boolean,
        event?: KeyboardEvent,
    ) {
        const matchedHandlers = this.keyBindings.filter(
            (item) =>
                item.inputKey === inputKey &&
                item.useCtrl === useControl &&
                item.useShift === useShift &&
                item.useAlt === useAlt,
        );
        if (matchedHandlers.length && event) {
            event.preventDefault();
            event.stopPropagation();
        }

        matchedHandlers.forEach((handler) => handler.invoke());
    }
}
