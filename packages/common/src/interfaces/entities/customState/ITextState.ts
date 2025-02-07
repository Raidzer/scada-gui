import { IBaseStateOption } from "../IBaseStateOption";

export interface ITextState extends IBaseStateOption {
    text: string;
    fontFamily: string;
    fontSize: number;
    fontStyle: string;
    align: string;
    verticalAlign: string;
}
