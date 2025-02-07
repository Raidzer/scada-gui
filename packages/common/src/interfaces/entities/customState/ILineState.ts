import { IBaseStateOption } from "../IBaseStateOption";

export interface ILineState extends IBaseStateOption {
    points: number[];
    tension: number;
    closed: boolean;
}
