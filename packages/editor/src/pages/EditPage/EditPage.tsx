import { CircleLoading } from "@scada/common";
import ControlPanel from "@scada/editor/components/ControlPanel/ControlPanel";
import LibraryObjectsPanel from "@scada/editor/components/LibraryObjectsPanel/LibraryObjectsPanel";
import ObjectPropertyMenu from "@scada/editor/components/ObjectPropertyMenu/ObjectPropertyMenu";
import PlanCanvasEditor from "@scada/editor/components/PlanCanvasEditor/PlanCanvasEditor";
import { useStore } from "@scada/state";
import { observer } from "mobx-react";
import { useEffect, useRef, useState } from "react";
import style from "./style.module.css";

const EditPage = () => {
    const store = useStore();
    const mainContainer = useRef<HTMLDivElement | null>(null);
    const [loadingData, setLoadingData] = useState<boolean>(true);

    async function onMount() {
        setLoadingData(true);
        try {
            await store.editorSelectProject.fetchData();
            store.editorSelectPlan.getFirstPlan();
            await store.icon.fetchData();
        } catch (e) {
            console.error("Failed to load project data", e);
        } finally {
            setLoadingData(false);
        }
    }

    function unMount() {
        store.commandEditor.resetCommands();
    }

    useEffect(() => {
        onMount();

        return () => {
            unMount();
        };
    }, []);

    return (
        <div className={style.mainContainer} ref={mainContainer}>
            <div>
                <ControlPanel />
            </div>
            {loadingData ? (
                <CircleLoading />
            ) : (
                <>
                    <div className={style.contentContainer}>
                        <div className={style.optionsContainer}>
                            <ObjectPropertyMenu />
                        </div>
                        <LibraryObjectsPanel />
                        <div className={style.canvasContainer}>
                            <PlanCanvasEditor />
                        </div>
                    </div>
                </>
            )}
            <div className={style.footer}>Заглушка для футера</div>
        </div>
    );
};

export default observer(EditPage);
