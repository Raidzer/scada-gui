import { CircularProgress } from "@mui/material";
import React from "react";

interface IProps {
    value: number;
}

export const ProgressCircleLoading: React.FC<IProps> = ({value}) => (
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "94vh",
        }}
    >
        <div>
            <CircularProgress
                color="inherit"
                variant="determinate"
                value={value}
            />
        </div>
    </div>
);
