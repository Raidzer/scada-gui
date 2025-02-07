import { ISubscriptionsTm } from "./SubscriptionsTm/ISubscriptionsTm";
import { IFrameOption } from "./IFrameOption";
import { IBaseStateOption } from "./IBaseStateOption";

export interface IBaseEntityOption {
    id: string;
    idGroup: number;
    idPlan: string;
    idLayer: string;
    name: string;
    frame: IFrameOption;
    value?: string;
    tooltip?: string;
    states: IBaseStateOption[];
    commands: string[];
    subscriptionsTm?: ISubscriptionsTm;
}
