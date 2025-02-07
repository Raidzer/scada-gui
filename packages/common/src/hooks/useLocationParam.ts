import { useLocation } from "@algont/m7-react-router";

const useLocationParam = (params: string) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const param = searchParams.get(params);

    return [param];
};

export { useLocationParam };
