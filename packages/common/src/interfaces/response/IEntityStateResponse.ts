import { ICircleState } from "../entities/customState/ICircleState";
import { IEllipseState } from "../entities/customState/IEllipseState";
import { IImageState } from "../entities/customState/IImageState";
import { ILineState } from "../entities/customState/ILineState";
import { IRectangleState } from "../entities/customState/IRectangleState";
import { IScaleState } from "../entities/customState/IScaleState";
import { IStarState } from "../entities/customState/IStarState";
import { ITextState } from "../entities/customState/ITextState";


export interface IEntityStateResponse
    extends ILineState,
        ITextState,
        IRectangleState,
        ICircleState,
        IEllipseState,
        IStarState,
        IImageState,
        IScaleState {}
