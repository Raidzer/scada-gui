import { EntityEditorFactory } from "@scada/editor/factories/EntityEditorFactory";
import { useStore } from "@scada/state";
import { observer } from "mobx-react";

const EditorPlan = () => {
    const store = useStore();

    return (
        <>
            {store.editorSelectPlan.entitiesList.map((entity) => {
                return EntityEditorFactory.createComponent(entity);
            })}
        </>
    );
};

export default observer(EditorPlan);
