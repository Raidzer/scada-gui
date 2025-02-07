import { useContext } from "react";
import { AppStoreContext } from "../contexts/AppStoreContext";


export const useStore = () => {
    return useContext(AppStoreContext);
};