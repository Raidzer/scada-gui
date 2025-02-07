import { KonvaEventObject } from "konva/lib/Node";
import { observer } from "mobx-react";
import React from "react";
import { Image, Rect } from "react-konva";
import useImage from "use-image";

interface IPlanBackgroundProps {
    src?: string;
    backgroundColor?: string;
    width: number | undefined;
    height: number | undefined;
    onClick?: (e: KonvaEventObject<MouseEvent>) => void;
}

const PlanBackground: React.FC<IPlanBackgroundProps> = ({
    src,
    width,
    height,
    onClick,
    backgroundColor,
}) => {
    const [image] = useImage(src ?? "");

    return (
        <>
            {src && (
                <Image
                    image={image}
                    notSelectable
                    width={width ?? 0}
                    height={height ?? 0}
                    onClick={onClick}
                />
            )}
            <Rect
                width={width ?? 0}
                height={height ?? 0}
                fill={backgroundColor ?? "transparent"}
                onClick={onClick}
            />
        </>
    );
};

export default observer(PlanBackground);
