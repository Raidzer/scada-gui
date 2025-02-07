interface IKeyboardBindingOptions {
    inputKey: string;
    useCtrl?: boolean;
    useShift?: boolean;
    useAlt?: boolean;
    eventName: string;
    actionHandler: (eventName: string) => void;
}

export class KeyboardBinding {
    inputKey: string;
    useCtrl: boolean;
    useShift: boolean;
    useAlt: boolean;
    eventName: string;
    actionHandler: (eventName: string) => void;

    constructor(options: IKeyboardBindingOptions) {
        this.inputKey = options.inputKey;
        this.useCtrl = options.useCtrl ?? false;
        this.useShift = options.useShift ?? false;
        this.useAlt = options.useAlt ?? false;
        this.eventName = options.eventName;

        this.actionHandler = options.actionHandler;
    }

    invoke() {
        this.actionHandler(this.eventName);
    }
}
