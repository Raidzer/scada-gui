import React from "react";
import { observer } from "mobx-react";
import { BaseEntity } from "@scada/common";
import { IBaseStateOption } from "@scada/common";
import { EntityComponentFactory } from "@scada/viewer/factories/EntityComponentFactory";

interface IPropsViewerPlan {
    entities: BaseEntity<IBaseStateOption>[];
}

const ViewerPlan: React.FC<IPropsViewerPlan> = ({ entities }) => {
    return <>{entities.map((entity) => EntityComponentFactory.createComponent(entity))}</>;
};

export default observer(ViewerPlan);
