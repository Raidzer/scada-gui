import { ISubscriptionsTm } from "../entities/SubscriptionsTm/ISubscriptionsTm";
import { IFieldOfView } from "../fieldOfView/IFieldOfView";
import { ILayerRequest } from "./ILayerRequest";

export interface IDataSavePlan {
    idMnemonicScheme: string;
    name: string;
    width: number;
    height: number;
    backgroundColor: string;
    fieldOfView: IFieldOfView;
    subscriptionsTm: Partial<Pick<ISubscriptionsTm, "idFrame">>[];
    layers: ILayerRequest[];
}
