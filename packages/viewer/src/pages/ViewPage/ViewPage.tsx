import { CircleLoading, useLocationParam } from "@scada/common";
import { useStore } from "@scada/state";
import Plan from "@scada/viewer/components/Plan/Plan";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";

const ViewPage = () => {
    const store = useStore();
    const [idPlan] = useLocationParam("idPlan");
    const [dataLoading, setDataLoading] = useState<boolean>(true);

    async function onMount() {
        try {
            await store.viewerSelectProject.fetchData();
            store.viewerSelectPlan.selectFirstPlan();
            await store.icon.fetchData();
        } catch (error) {
            console.log(error);
        } finally {
            setDataLoading(false);
        }
    }

    useEffect(() => {
        onMount();
    }, []);

    return <>{dataLoading ? <CircleLoading /> : <Plan />}</>;
};

export default observer(ViewPage);
