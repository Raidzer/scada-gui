import { Vector2d } from "konva/lib/types";
import { action, makeObservable, observable } from "mobx";
import { BaseEntity } from "../Elements/BaseEntity";
import { IBaseStateOption } from "@scada/common/interfaces/entities/IBaseStateOption";


export class ContextMenu {
    isShow: boolean;
    pointerPosition: Vector2d;
    contextMenu: React.ReactNode | null;
    menuItem: Array<string>;
    entity: BaseEntity<IBaseStateOption> | null;

    constructor() {
        this.isShow = false;
        this.pointerPosition = { x: 0, y: 0 };
        this.contextMenu = null;
        this.menuItem = [];
        this.entity = null;
        makeObservable(this, {
            isShow: observable,
            hide: action,
            show: action,
        });
    }

    show(items: Array<string>, position: Vector2d, entity?: BaseEntity<IBaseStateOption>): void {
        if (items.length === 0 || (position.x === 0 && position.y === 0)) return;
        this.pointerPosition = position;
        this.menuItem = items;
        this.isShow = true;
        this.entity = entity ?? null;
        window.addEventListener("contextmenu", this.stopPropagation, true);
    }

    hide(): void {
        this.isShow = false;
        this.contextMenu = null;
        window.removeEventListener("contextmenu", this.stopPropagation, true);
    }

    invokeWithClose(cb: () => void): void {
        cb();
        this.hide();
    }

    stopPropagation(event: MouseEvent): void {
        event.preventDefault();
    }
}
