import { IBrowserRoute } from "@algont/m7-react-router";
import { EditPage } from "@scada/editor";
import { MainPage } from "@scada/common";
import { ViewPage } from "@scada/viewer";

export const routes: IBrowserRoute[] = [
    {
        path: "/",
        component: MainPage,
        exact: true,
    },
    {
        path: "/plan",
        component: ViewPage,
        exact: true,
    },
    {
        path: "/edit",
        component: EditPage,
        exact: true,
    },
];
