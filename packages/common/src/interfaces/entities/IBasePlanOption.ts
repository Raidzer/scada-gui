import FieldOfView from "@scada/common/models/Canvas/FieldOfView/FieldOfView";
import { ISubscriptionsTm } from "./SubscriptionsTm/ISubscriptionsTm";
import LayerModel from "@scada/common/models/layer/LayerModel";

export interface IBasePlanOption {
    idMnemonicScheme: string;
    name: string;
    width: number;
    height: number;
    backgroundColor: string | undefined;
    fieldOfView: FieldOfView;
    subscriptionsTm: ISubscriptionsTm[];
    layers: LayerModel[];
}
