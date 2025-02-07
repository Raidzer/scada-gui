import { DraggableLayer, PlanBackground, socketTopic, websocket } from "@scada/common";
import { useStore } from "@scada/state";
import Konva from "konva";
import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
import { Layer, Stage } from "react-konva";
import ContextMenuViewer from "../ContextMenuViewer/ContextMenuViewer";
import PlanSelectionPanel from "../PlanSelectionPanel/PlanSelectionPanel";
import ViewerPlan from "../ViewerPlan.tsx/ViewerPlan";
import style from "./style.module.css";

const Plan = () => {
    const store = useStore();
    const tooltipLayer = useRef<Konva.Layer>(null);
    const stageRef = useRef<Konva.Stage>(null);
    const { optionsLayer } = store.viewerInterface.zoomAndScrollManager;
    const parentDiv = useRef<HTMLDivElement | null>(null);

    const onMount = () => {
        if (tooltipLayer.current) {
            store.viewerInterface.setTooltip(tooltipLayer.current);
        }

        store.updateStateSocket.connectToUpdateStateSocket(
            websocket(),
            socketTopic(store.viewerSelectPlan.selectPlan?.idMnemonicScheme ?? ""),
            false,
        );
    };

    useEffect(() => {
        onMount();
    }, []);

    useEffect(() => {
        if (!stageRef.current) return;
        stageRef.current.width(optionsLayer.width);
        stageRef.current.height(optionsLayer.height);
    }, [optionsLayer.height, optionsLayer.width]);

    return (
        <div>
            <div className={style.containerSelectionPanel}>
                <PlanSelectionPanel />
            </div>
            <div className={style.containerCanvas} ref={parentDiv}>
                <Stage width={optionsLayer.width} height={optionsLayer.height} ref={stageRef}>
                    <DraggableLayer
                        dragBounds={(pos) => store.viewerInterface.dragBounds(pos)}
                        firstLoadPage={(w, h) => store.viewerInterface.firstLoadPage(w, h)}
                        optionsLayer={store.viewerInterface.optionsLayer}
                        resizePlan={(w, h) => store.viewerInterface.resizePlan(w, h)}
                        setBackgroundSize={(w, h) => store.viewerInterface.setBackgroundSize(w, h)}
                        scale={store.viewerInterface.scale}
                        scaleDown={(layer) => store.viewerInterface.scaleDown(layer)}
                        scaleUp={(layer) => store.viewerInterface.scaleUp(layer)}
                        sizePlan={store.viewerInterface.sizePlan}
                        parentDiv={parentDiv.current}
                        setupSizeParentDiv={(w, h) => store.viewerInterface.setSizeParentDiv(w, h)}
                    >
                        <PlanBackground
                            height={store.viewerSelectPlan.selectPlan?.height}
                            width={store.viewerSelectPlan.selectPlan?.width}
                            backgroundColor={store.viewerSelectPlan.selectPlan?.backgroundColor}
                        />
                        <ViewerPlan entities={store.viewerSelectPlan.entitiesAllList} />
                    </DraggableLayer>
                    <Layer ref={tooltipLayer}></Layer>
                </Stage>
                <ContextMenuViewer />
            </div>
        </div>
    );
};

export default observer(Plan);
