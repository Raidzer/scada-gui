import { CircularProgress } from "@mui/material";

export const CircleLoading = () => (
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "94vh",
        }}
    >
        <div>
            <CircularProgress color="inherit" variant="indeterminate" />
        </div>
    </div>
);
