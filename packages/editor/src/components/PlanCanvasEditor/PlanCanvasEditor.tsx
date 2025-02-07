import { CircleLoading } from "@scada/common";
import { useStore } from "@scada/state";
import { observer } from "mobx-react";
import CanvasEditor from "../CanvasEditor/CanvasEditor";
import CanvasEditorToolbar from "../CanvasToolbar/CanvasEditorToolbar";
import PlanSelectionPanel from "../PlanSelectionPanel/PlanSelectionPanel";
import style from "./style.module.css";

const PlanCanvasEditor = () => {
    const store = useStore();

    return (
        <div className={style.mainContainer}>
            <PlanSelectionPanel />
            <CanvasEditorToolbar />
            {store.editorSelectPlan.selectPlan &&
                (store.editorSelectPlan.isLoading ? <CircleLoading /> : <CanvasEditor />)}
            {!store.editorSelectPlan.selectPlan && (
                <div className={style.selectPlan}>
                    <h2>Выберите план</h2>
                </div>
            )}
        </div>
    );
};

export default observer(PlanCanvasEditor);
