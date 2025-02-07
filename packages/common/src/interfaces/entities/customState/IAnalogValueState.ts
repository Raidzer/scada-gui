import { IBaseStateOption } from "../IBaseStateOption";

export interface IAnalogValueState extends IBaseStateOption {
    text: string;
    fontFamily: string;
    fontSize: number;
    fontStyle: string;
    align: string;
    verticalAlign: string;
}