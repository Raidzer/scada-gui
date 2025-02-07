import { useCustomHistory } from "@algont/m7-react-router";
import { Button } from "@mui/material";
import { observer } from "mobx-react";
import { MouseEvent } from "react";
import style from "@scada/common/pages/MainPage/style.module.css";

const MainPage = () => {
    const history = useCustomHistory();

    const onClick = (event: MouseEvent<HTMLButtonElement>, target: string) => {
        event.preventDefault();
        if (history) {
            history.go(target);
        }
    };

    return (
        <div className={style.mainContainer}>
            <div className={style.linkMenu}>
                <Button
                    className={style.linkMenuButton}
                    variant="contained"
                    onClick={(event) => onClick(event, "/plan?idPlan=1")}
                >
                    План
                </Button>
                <Button
                    className={style.linkMenuButton}
                    variant="contained"
                    onClick={(event) => onClick(event, "/edit")}
                >
                    Редактор
                </Button>
            </div>
        </div>
    );
};

export default observer(MainPage);
