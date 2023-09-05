//src/components/selectors/IconButton/index.tsx
import { UserComponent, useNode } from "@craftjs/core";
import clsx from "clsx";
import { styled } from "@mui/material/styles";
import { IconButton, Box } from "@mui/material";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";

import { IconButton1Settings } from "./IconButton1Settings";
import DynamicIcon from "../../../utils/DynamicIcon";
import { Resizer } from "../Resizer";

type ButtonProps = {
  background?: Record<"r" | "g" | "b" | "a", number>;
  color?: Record<"r" | "g" | "b" | "a", number>;
  hoverBackground?: Record<"r" | "g" | "b" | "a", number>;
  hoverColor?: Record<"r" | "g" | "b" | "a", number>;
  borderType?:
    | "default"
    | "none"
    | "solid"
    | "double"
    | "dotted"
    | "dashed"
    | "groove";
  borderColor?: Record<"r" | "g" | "b" | "a", number>;
  hoverBorderType?:
    | "default"
    | "none"
    | "solid"
    | "double"
    | "dotted"
    | "dashed"
    | "groove";
  hoverBorderColor?: Record<"r" | "g" | "b" | "a", number>;
  variant?: "text" | "outlined" | "contained";
  margin: [number, number, number, number];
  padding: [number, number, number, number];
  startIcon?: string;
  hoverStartIcon?: string; // New
  startIconColor?: Record<"r" | "g" | "b" | "a", number>; // New
  hoverStartIconColor?: Record<"r" | "g" | "b" | "a", number>; // New
  iconSize?: number; // New: define the icon size
  hoverIconSize?: number; // New: define the hover icon size
  tooltipText?: string; // New: tooltip text
  width?: number | string; // New: width
  height?: number | string; // New: height
};

const StyledButton = styled(IconButton)<ButtonProps>(
  ({
    background,
    hoverBackground,
    color,
    hoverColor,
    borderType,
    borderColor,
    hoverBorderType,
    hoverBorderColor,
    margin
  }) => ({
    display: "flex",
    flexDirection: "column", // Align icon and text vertically
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
    borderRadius: "4px",
    background: background
      ? `rgba(${Object.values(background)})`
      : "transparent",
    color: color ? `rgba(${Object.values(color)})` : undefined,
    border:
      borderType && borderType !== "default"
        ? `${borderType} 2px rgba(${Object.values(
            borderColor || { r: 0, g: 0, b: 0, a: 1 }
          )})`
        : "2px solid transparent",
    margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
    "&:hover": {
      background: hoverBackground
        ? `rgba(${Object.values(hoverBackground)})`
        : undefined,
      border:
        hoverBorderType && hoverBorderType !== "default"
          ? `${hoverBorderType} 2px rgba(${Object.values(
              hoverBorderColor || { r: 0, g: 0, b: 0, a: 1 }
            )})`
          : "2px solid transparent"
    },
    "&:hover span": {
      // Targeting the text span inside the button
      color: hoverColor ? `rgba(${Object.values(hoverColor)})` : undefined
    }
  })
);

export const IconButton1: UserComponent<ButtonProps> = (props: any) => {
  const {
    connectors: { connect }
  } = useNode();

  const [isHovered, setIsHovered] = useState(false);
  const {
    textComponent,
    color,
    hoverColor,
    startIcon,
    hoverStartIcon,
    startIconColor,
    hoverStartIconColor,
    iconSize,
    ...otherProps
  } = props;

  const startIconName =
    isHovered && hoverStartIcon ? hoverStartIcon : startIcon || "Home";
  const startIconFillColor =
    isHovered && hoverStartIconColor ? hoverStartIconColor : startIconColor;

  const StartIconComponent = startIconName && (
    <DynamicIcon
      iconName={startIconName}
      color={`rgba(${Object.values(
        startIconFillColor || { r: 0, g: 0, b: 0, a: 1 }
      )})`}
    />
  );

  return (
    <div ref={connect} style={{ height: "100%" }}>
      <Resizer
        propKey={{ width: "width", height: "height" }}
        minWidth={iconSize || 24}
        minHeight={iconSize || 24}
      >
        {" "}
        {/* Added height property */}
        <Box
          display="flex"
          flexDirection={"left" ? "row" : "column"}
          alignItems="flex-start"
          style={{
            width: props.width || "100%",
            height: props.height || "100%",
            margin: `${props.margin[0]}px ${props.margin[1]}px ${props.margin[2]}px ${props.margin[3]}px`,
            padding: `${props.padding[0]}px ${props.padding[1]}px ${props.padding[2]}px ${props.padding[3]}px`
          }}
        >
          <Tooltip title={props.tooltipText || ""}>
            <StyledButton
              ref={connect}
              className={clsx("iconButton")}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{ width: "100%", height: "100%" }} // Set width and height to 100%
              {...otherProps}
            >
              {StartIconComponent}
            </StyledButton>
          </Tooltip>
        </Box>
      </Resizer>
    </div>
  );
};

IconButton1.craft = {
  displayName: "Icon Button",
  props: {
    background: { r: 255, g: 255, b: 255, a: 0.5 },
    color: { r: 92, g: 90, b: 90, a: 1 },
    hoverBackground: { r: 235, g: 235, b: 235, a: 0.5 },
    hoverColor: { r: 72, g: 70, b: 70, a: 1 },
    borderType: "default", // New
    borderColor: { r: 0, g: 0, b: 0, a: 1 }, // New
    hoverBorderType: "default", // New
    hoverBorderColor: { r: 0, g: 0, b: 0, a: 1 }, // New
    variant: "contained",
    margin: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    startIcon: "Home",
    hoverStartIcon: "", // New
    startIconColor: { r: 0, g: 0, b: 0, a: 1 }, // New
    hoverStartIconColor: { r: 0, g: 0, b: 0, a: 1 }, // New
    iconSize: 12, // default icon size
    hoverIconSize: 12, // default hover icon size
    tooltipText: IconButton1.displayName, // New: tooltip text
    width: "auto", // New: width
    height: "auto" // New: height
  },
  related: {
    toolbar: IconButton1Settings
  }
};
