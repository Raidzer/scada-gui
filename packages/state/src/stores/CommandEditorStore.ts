import { ICommand } from "@scada/common";
import { AppStore } from "./AppStore";
import { makeAutoObservable } from "mobx";
import { MAX_STACK_COMMAND } from "../constants/command";
import _ from "lodash";

export class CommandEditorStore {
    private store: AppStore;
    private stackDo: ICommand[] = [];
    private stackUndo: ICommand[] = [];

    constructor(store: AppStore) {
        this.store = store;
        makeAutoObservable(this);
    }

    private _addCommandDoStack(command: ICommand) {
        if (this.stackDo.length > MAX_STACK_COMMAND) {
            this.stackDo = _.slice(this.stackDo, 1);
        }
        this.stackDo.push(command);
    }

    private _addCommandUndoStack(command: ICommand) {
        if (this.stackUndo.length > MAX_STACK_COMMAND) {
            this.stackUndo = _.slice(this.stackUndo, 1);
        }
        this.stackUndo.push(command);
    }

    resetStackUndo() {
        this.stackUndo = [];
    }

    resetCommands() {
        this.stackDo = [];
        this.stackUndo = [];
    }

    redo(): void {
        if (this.stackUndo.length > 0) {
            const lastUndoCommand = this.stackUndo.pop();
            if (lastUndoCommand) {
                lastUndoCommand.do();
                this._addCommandDoStack(lastUndoCommand);
            }
        }
    }

    undo(): void {
        if (this.stackDo.length > 0) {
            const lastDoCommand = this.stackDo.pop();
            if (lastDoCommand) {
                lastDoCommand.undo();
                this._addCommandUndoStack(lastDoCommand);
            }
        }
    }

    execute(command: ICommand): void {
        command.do();
        this._addCommandDoStack(command);
        this.resetStackUndo();
    }

    get doEnable(): boolean {
        return this.stackUndo.length < 1;
    }

    get undoEnable(): boolean {
        return this.stackDo.length < 1;
    }
}
