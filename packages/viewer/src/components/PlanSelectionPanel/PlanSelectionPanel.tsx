import { useCustomHistory } from "@algont/m7-custom-history";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useStore } from "@scada/state";
import { CircleX } from "lucide-react";
import { observer } from "mobx-react";
import { MouseEvent } from "react";
import style from "./style.module.css";

const PlanSelectionPanel = () => {
    const store = useStore();
    const history = useCustomHistory();

    const handleClickChangePlan = (idPlan: string) => {
        store.viewerSelectPlan.changeSelectPlan(idPlan);
    };

    const onClickClose = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (history) {
            history.go("/");
        }
    };

    return (
        <>
            <div className={style.controlPanel}>
                <div>
                    {store.viewerSelectProject.allPlans.map((plan) => {
                        return (
                            <Button
                                key={plan.idMnemonicScheme}
                                variant={
                                    store.viewerSelectPlan.selectPlan?.idMnemonicScheme ===
                                    plan.idMnemonicScheme
                                        ? "contained"
                                        : "outlined"
                                }
                                className={style.buttonPlan}
                                onClick={() => handleClickChangePlan(plan.idMnemonicScheme)}
                            >
                                {plan.name}
                            </Button>
                        );
                    })}
                </div>
                <div>
                    <Tooltip title="Выйти">
                        <span>
                            <IconButton
                                className={`${style.panelButton} ${style.rightAlignedButton}`}
                                aria-label="exit"
                                color="default"
                                onClick={(event) => onClickClose(event)}
                            >
                                <CircleX />
                            </IconButton>
                        </span>
                    </Tooltip>
                </div>
            </div>
        </>
    );
};

export default observer(PlanSelectionPanel);
