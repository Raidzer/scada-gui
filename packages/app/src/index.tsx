import ReactDOM from "react-dom/client";
import "./reset.css";
import { StyledEngineProvider } from "@mui/material";
import {AppStoreContext, appStore} from "@scada/state"
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <AppStoreContext.Provider value={appStore}>
        <StyledEngineProvider injectFirst={true}>
                <App />
        </StyledEngineProvider>
    </AppStoreContext.Provider>,
);
