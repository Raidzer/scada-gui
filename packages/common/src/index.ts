import { MAX_SCALE_PLAN, MIN_SCALE_PLAN } from "@scada/common/constants/index";
import {
    deleteImage,
    deletePlan,
    getImage,
    getPlan,
    getProject,
    saveImage,
    savePlan,
    scadaEvent,
    socketTopic,
    websocket,
} from "./api/endPoints";
import PlanBackground from "./components/Background/PlanBackground";
import DraggableLayer from "./components/DraggableLayer/DraggableLayer";
import { CircleLoading } from "./components/loading/Circle/CircleLoading";
import { ProgressCircleLoading } from "./components/loading/ProgressCircle/ProgressCircleLoading";
import {
    LOADING_PROGRESS_33,
    LOADING_PROGRESS_66,
    LOADING_PROGRESS_FINISH,
    TIMEOUT_1S,
    TIMEOUT_2S,
    TIME_DEBOUNCE_MS,
} from "./constants/config";
import { EntityType } from "./enums/entity/EntityType";
import { InterceptEventType } from "./enums/intercept/InterceptEventType";
import { ButtonMouseType } from "./enums/Konva/ButtonMouseType";
import { TypeTm } from "./enums/TypeTm/TypeTm";
import { useElementInteractionViewer } from "./hooks/useElementInteractionViewer";
import useInput from "./hooks/useInput";
import { useLocationParam } from "./hooks/useLocationParam";
import { TooltipKonva } from "./models/Canvas/Tooltip/TooltipKonva";
import { ContextMenu } from "./models/ContextMenu/ContextMenu";
import { AnalogValueModel } from "./models/Elements/AnalogValueModel";
import { BaseEntity } from "./models/Elements/BaseEntity";
import { CircleModel } from "./models/Elements/CircleModel";
import { EllipseModel } from "./models/Elements/EllipseModel";
import { FrameModel } from "./models/Elements/FrameModel";
import { ImageModel } from "./models/Elements/ImageModel";
import { LineModel } from "./models/Elements/LineModel";
import { RectangleModel } from "./models/Elements/RectangleModel";
import { ScaleModel } from "./models/Elements/ScaleModel";
import { StarModel } from "./models/Elements/StarModel";
import { TextModel } from "./models/Elements/TextModel";
import { EventBus } from "./models/event/EventBus";
import { KeyboardBinding } from "./models/hotkey/KeyboardBinding";
import { KeyboardEventType } from "./models/hotkey/KeyboardEventType";
import { PictureModel } from "./models/PictureModel/PictureModel";
import { PlanModel } from "./models/Plan/PlanModel";
import { ZoomAndScrollManager } from "./models/viewer/ZoomAndScrollManager/ZoomAndScrollManager";
import MainPage from "./pages/MainPage/MainPage";
import { CustomMap } from "./utils/CustomMap/CustomMap";

export {
    AnalogValueModel,
    BaseEntity,
    ButtonMouseType,
    CircleLoading,
    CircleModel,
    ContextMenu,
    CustomMap,
    DraggableLayer,
    EllipseModel,
    EntityType,
    EventBus,
    FrameModel,
    ImageModel,
    InterceptEventType,
    KeyboardBinding,
    KeyboardEventType,
    LOADING_PROGRESS_33,
    LOADING_PROGRESS_66,
    LOADING_PROGRESS_FINISH,
    LineModel,
    MAX_SCALE_PLAN,
    MIN_SCALE_PLAN,
    MainPage,
    PictureModel,
    PlanBackground,
    PlanModel,
    ProgressCircleLoading,
    RectangleModel,
    ScaleModel,
    StarModel,
    TIMEOUT_1S,
    TIMEOUT_2S,
    TIME_DEBOUNCE_MS,
    TextModel,
    TooltipKonva,
    TypeTm,
    ZoomAndScrollManager,
    deleteImage,
    deletePlan,
    getImage,
    getPlan,
    getProject,
    saveImage,
    savePlan,
    scadaEvent,
    socketTopic,
    useElementInteractionViewer,
    useInput,
    useLocationParam,
    websocket,
};

export type { ICommand } from "./utils/Editor/Command/ICommand";

export type { IOptionsLayer } from "./interfaces/viewer/OptionsLayer/OptionsLayer";

export type { IScrollLimit } from "./interfaces/viewer/ScrollLimit/IScrollLimit";

export type { IBaseStateOption } from "./interfaces/entities/IBaseStateOption";

export type { IDataSavePlan } from "./interfaces/request/IDataSavePlan";

export type { ISelectPlanResponse } from "./interfaces/response/ISelectPlanResponse";

export type { IErrorResponse } from "./interfaces/response/error/IErrorResponse";

export type { IPlanListResponse } from "./interfaces/response/IPlanListResponse";

export type { ISocketStateUpdate } from "./interfaces/WebSocket/ISocketStateUpdate";

export type { IPoint2D } from "@scada/common/interfaces/entities/IPoint2D";

export type { IBaseEntityOption } from "@scada/common/interfaces/entities/IBaseEntityOption";

export type { IAnalogValueState } from "@scada/common/interfaces/entities/customState/IAnalogValueState";

export type { ICircleState } from "@scada/common/interfaces/entities/customState/ICircleState";

export type { IEllipseState } from "@scada/common/interfaces/entities/customState/IEllipseState";

export type { IImageState } from "@scada/common/interfaces/entities/customState/IImageState";

export type { ILineState } from "@scada/common/interfaces/entities/customState/ILineState";

export type { IStarState } from "@scada/common/interfaces/entities/customState/IStarState";

export type { IRectangleState } from "@scada/common/interfaces/entities/customState/IRectangleState";

export type { IScaleState } from "@scada/common/interfaces/entities/customState/IScaleState";

export type { ITextState } from "@scada/common/interfaces/entities/customState/ITextState";

export type { IChangeTmRequest } from "@scada/common/interfaces/request/ChangeTm/IChangeTmRequest";

export type { IImageResponse } from "@scada/common/interfaces/response/IImagesResponse";
