import { IErrorField } from "./IErrorField";

export interface IErrorResponse {
    message: string;
    name: string;
    result: boolean;
    errors: IErrorField[];
}
