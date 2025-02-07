import { DraggableLayer, PlanBackground } from "@scada/common";
import { AddEntityCommand } from "@scada/editor/utils/Command/Entities/AddEntityCommand";
import { useStore } from "@scada/state";
import Konva from "konva";
import { observer } from "mobx-react";
import { DragEvent, useEffect, useRef } from "react";
import { Stage } from "react-konva";
import ContextMenuEditor from "../ContextMenuEditor/ContextMenuEditor";
import EditorPlan from "../EditorPlan/EditorPlan";
import style from "./style.module.css";

const CanvasEditor = () => {
    const store = useStore();
    const stageRef = useRef<Konva.Stage>(null);
    const { optionsLayer } = store.editorInterface.zoomAndScrollManager;
    const parentDiv = useRef<HTMLDivElement | null>(null);

    const unselectEntities = () => {
        store.editorSelectPlan.unselectEntities();
    };

    const dropEntity = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (stageRef.current) {
            stageRef.current.setPointersPositions(e);
        }
        const position = stageRef.current
            ?.getChildren()
            .find((child) => child.attrs.id === "draggable-layer-editor")
            ?.getRelativePointerPosition();
        const newEntity = store.editorSelectPlan.newEntity;
        if (newEntity && position) {
            newEntity.updateCoord(position);
            store.commandEditor.execute(new AddEntityCommand(store.editorSelectPlan, newEntity));
        }
    };

    useEffect(() => {
        if (!stageRef.current) return;
        stageRef.current.width(optionsLayer.width);
        stageRef.current.height(optionsLayer.height);
    }, [optionsLayer.height, optionsLayer.width]);

    return (
        <>
            {store.editorSelectPlan.dataLoadingError ? (
                <div className={style.errorContainer}>
                    <h1>{store.editorSelectPlan.dataLoadingError}</h1>
                </div>
            ) : (
                <div className={style.workspaceCanvas}>
                    <div
                        className={style.canvasContainer}
                        onDrop={dropEntity}
                        onDragOver={(e) => e.preventDefault()}
                        ref={parentDiv}
                    >
                        <Stage
                            ref={stageRef}
                            height={store.editorSelectPlan.selectPlan?.height}
                            width={store.editorSelectPlan.selectPlan?.width}
                        >
                            <DraggableLayer
                                id="draggable-layer-editor"
                                dragBounds={(pos) => store.editorInterface.dragBounds(pos)}
                                firstLoadPage={(w, h) => store.editorInterface.firstLoadPage(w, h)}
                                optionsLayer={store.editorInterface.optionsLayer}
                                resizePlan={(w, h) => store.editorInterface.resizePlan(w, h)}
                                setBackgroundSize={(w, h) =>
                                    store.editorInterface.setBackgroundSize(w, h)
                                }
                                scale={store.editorInterface.scale}
                                scaleDown={(layer) => store.editorInterface.scaleDown(layer)}
                                scaleUp={(layer) => store.editorInterface.scaleUp(layer)}
                                sizePlan={store.editorInterface.sizePlan}
                                parentDiv={parentDiv.current}
                                setupSizeParentDiv={(w, h) =>
                                    store.editorInterface.setSizeParentDiv(w, h)
                                }
                            >
                                <PlanBackground
                                    height={store.editorSelectPlan.selectPlan?.height}
                                    width={store.editorSelectPlan.selectPlan?.width}
                                    onClick={() => unselectEntities()}
                                    backgroundColor={
                                        store.editorSelectPlan.selectPlan?.backgroundColor
                                    }
                                />
                                <EditorPlan />
                            </DraggableLayer>
                        </Stage>
                        <ContextMenuEditor />
                    </div>
                </div>
            )}
        </>
    );
};

export default observer(CanvasEditor);
