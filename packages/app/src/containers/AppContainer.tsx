import { CustomHistoryProvider, M7Router, Switch, mapRoutes } from "@algont/m7-react-router";
import { Suspense, useEffect } from "react";
import { createBrowserHistory } from "history";
import { I18nextProvider } from "react-i18next";
import { CustomHistory } from "@algont/m7-custom-history";
import { observer } from "mobx-react";
//import { useStore } from "src/hooks/useStore";
import { useStore } from "@scada/state";
import { LOADING_PROGRESS_33, LOADING_PROGRESS_66, LOADING_PROGRESS_FINISH } from "@scada/common";
import { ProgressCircleLoading } from "@scada/common";
import i18n from "../locale";
import { routes } from "../routes";

function AppContainer() {
    const browserHistory = createBrowserHistory();
    const customHistory = new CustomHistory(browserHistory);
    const store = useStore();

    async function onMount() {
        store.loading.start();
        store.loading.setProgress(LOADING_PROGRESS_33);
        // await store.icon.fetchData();
        store.loading.setProgress(LOADING_PROGRESS_66);
        store.loading.setProgress(LOADING_PROGRESS_FINISH);
        store.loading.finish();
    }

    useEffect(() => {
        onMount();
    }, []);

    return store.loading.state ? (
        <ProgressCircleLoading value={store.loading.progress} />
    ) : (
        <I18nextProvider i18n={i18n}>
            <CustomHistoryProvider customHistory={customHistory}>
                <Suspense fallback={<ProgressCircleLoading value={store.loading.progress} />}>
                    <M7Router history={browserHistory}>
                        <Switch>{mapRoutes(routes)}</Switch>
                    </M7Router>
                </Suspense>
            </CustomHistoryProvider>
        </I18nextProvider>
    );
}

export default observer(AppContainer);
