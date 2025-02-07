import { IBaseEntityOption } from "@scada/common/interfaces/entities/IBaseEntityOption";
import { ISubscriptionsTm } from "@scada/common/interfaces/entities/SubscriptionsTm/ISubscriptionsTm";
import { TypeTm as TypeTmc } from "@scada/common/enums/TypeTm/TypeTm";
import { action, makeObservable, observable } from "mobx";

export class SubscriptionsTm implements ISubscriptionsTm {
    idFrame: string;
    typeTm: TypeTmc;
    idTm: string;

    constructor(option: IBaseEntityOption) {
        this.idFrame = option.subscriptionsTm?.idFrame ?? option.id;
        this.typeTm = option.subscriptionsTm?.typeTm ?? TypeTmc.none;
        this.idTm = option.subscriptionsTm?.idTm ?? "";
        makeObservable(this, {
            typeTm: observable,
            changeTypeTm: action,
            idTm: observable,
            changeIdTm: action,
        });
    }

    changeTypeTm(newTypeTm: TypeTmc) {
        this.typeTm = newTypeTm;
    }

    changeIdTm(newIdTm: string) {
        this.idTm = newIdTm;
    }

    get fullDescription(): ISubscriptionsTm {
        return { idFrame: this.idFrame, typeTm: this.typeTm, idTm: this.idTm };
    }
}
