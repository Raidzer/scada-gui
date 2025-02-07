import { createContext } from "react";
import { AppStore } from "../stores/AppStore";

export const appStore = new AppStore();

export const AppStoreContext = createContext(appStore);
