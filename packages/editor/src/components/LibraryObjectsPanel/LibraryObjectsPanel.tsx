import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { EntityType } from "@scada/common";
import DefaultShapeAnalogValue from "@scada/editor/utils/DefaultShape/DefaultShapeAnalogValue";
import DefaultShapeImage from "@scada/editor/utils/DefaultShape/DefaultShapeImage";
import DefaultShapeRectangle from "@scada/editor/utils/DefaultShape/DefaultShapeRectangle";
import DefaultShapeScale from "@scada/editor/utils/DefaultShape/DefaultShapeScale";
import DefaultShapeText from "@scada/editor/utils/DefaultShape/DefaultShapeText";
import { useStore } from "@scada/state";
import { observer } from "mobx-react";
import Draggable from "react-draggable";
import style from "./style.module.css";

const LibraryObjectsPanel = () => {
    const store = useStore();

    const onDragStart = (type: EntityType) => {
        const idPlan = store.editorSelectPlan.selectPlan?.idMnemonicScheme;
        if (!idPlan) return;
        switch (type) {
            case EntityType.Rectangle:
                store.editorSelectPlan.setInitNewEntity(DefaultShapeRectangle.rectangle(idPlan));
                break;
            case EntityType.Text:
                store.editorSelectPlan.setInitNewEntity(DefaultShapeText.text(idPlan));
                break;
            case EntityType.Scale:
                store.editorSelectPlan.setInitNewEntity(DefaultShapeScale.scale(idPlan));
                break;
            case EntityType.AnalogValue:
                store.editorSelectPlan.setInitNewEntity(
                    DefaultShapeAnalogValue.analogValue(idPlan),
                );
                break;
            case EntityType.Image:
                store.editorSelectPlan.setInitNewEntity(DefaultShapeImage.image(idPlan));
                break;
            default:
                break;
        }
    };

    const onDragEnd = () => {
        store.editorSelectPlan.resetInitNewEntity();
    };

    const handleCloseWindow = () => {
        store.editorInterface.closeWindowLibraryEntity();
    };

    return (
        <Draggable handle=".handle">
            <div
                className={`${style.mainContainer} ${
                    store.editorInterface.isOpenWindowLibraryEntity ? style.open : style.close
                }`}
            >
                <div className={`handle ${style.titleContainer}`}>
                    <IconButton aria-label="exit" color="default" onClick={handleCloseWindow}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <div className={style.iconsContainer}>
                    <img
                        src="./images/rectangle.png"
                        alt="Прямоугольник"
                        className={style.icons}
                        draggable
                        onDragStart={() => onDragStart(EntityType.Rectangle)}
                        onDragEnd={onDragEnd}
                        title="Прямоугольник"
                    />
                    <img
                        src="./images/text.png"
                        alt="Текст"
                        className={style.icons}
                        draggable
                        onDragStart={() => onDragStart(EntityType.Text)}
                        onDragEnd={onDragEnd}
                        title="Текст"
                    />
                    <img
                        src="./images/scale.png"
                        alt="Шкала"
                        className={style.icons}
                        draggable
                        onDragStart={() => onDragStart(EntityType.Scale)}
                        onDragEnd={onDragEnd}
                        title="Шкала"
                    />
                    <img
                        src="./images/analogValue.png"
                        alt="Аналоговое значение"
                        className={style.icons}
                        draggable
                        onDragStart={() => onDragStart(EntityType.AnalogValue)}
                        onDragEnd={onDragEnd}
                        title="Аналоговое значение"
                    />
                    <img
                        src="./images/image.png"
                        alt="Картинка"
                        className={style.icons}
                        draggable
                        onDragStart={() => onDragStart(EntityType.Image)}
                        onDragEnd={onDragEnd}
                        title="Картинка"
                    />
                </div>
            </div>
        </Draggable>
    );
};

export default observer(LibraryObjectsPanel);
