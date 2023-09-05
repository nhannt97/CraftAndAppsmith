//src/components/selectors/Button/index.tsx
import { UserComponent, useNode } from "@craftjs/core";
import clsx from "clsx";
import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";
import React, { useState } from "react";

import { ButtonSettings } from "./ButtonSettings";
import { Text } from "../Text";

import DynamicIcon from "../../../utils/DynamicIcon";

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
  size: string;
  text?: string;
  textComponent: {
    textAlign: "center";
  };
  startIcon?: string;
  endIcon?: string;
  hoverStartIcon?: string; // New
  hoverEndIcon?: string; // New
  startIconColor?: Record<"r" | "g" | "b" | "a", number>; // New
  endIconColor?: Record<"r" | "g" | "b" | "a", number>; // New
  hoverStartIconColor?: Record<"r" | "g" | "b" | "a", number>; // New
  hoverEndIconColor?: Record<"r" | "g" | "b" | "a", number>; // New
};

const StyledButton = styled(MuiButton)<ButtonProps>(
  ({
    background,
    hoverBackground,
    color,
    hoverColor,
    borderType,
    borderColor,
    hoverBorderType,
    hoverBorderColor,
    size,
    margin
  }) => ({
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

export const Button: UserComponent<ButtonProps> = (props: any) => {
  const {
    connectors: { connect }
  } = useNode((node) => ({
    selected: node.events.selected
  }));

  const [isHovered, setIsHovered] = useState(false);
  const {
    text,
    textComponent,
    color,
    hoverColor,
    startIcon,
    endIcon,
    hoverStartIcon,
    hoverEndIcon,
    startIconColor,
    endIconColor,
    hoverStartIconColor,
    hoverEndIconColor,
    ...otherProps
  } = props;
  const textColor = isHovered && hoverColor ? hoverColor : color;

  const startIconName =
    isHovered && hoverStartIcon ? hoverStartIcon : startIcon;
  const endIconName = isHovered && hoverEndIcon ? hoverEndIcon : endIcon;

  const startIconFillColor =
    isHovered && hoverStartIconColor ? hoverStartIconColor : startIconColor;
  const endIconFillColor =
    isHovered && hoverEndIconColor ? hoverEndIconColor : endIconColor;

  const StartIconComponent = startIconName && (
    <DynamicIcon
      iconName={startIconName}
      color={`rgba(${Object.values(
        startIconFillColor || { r: 0, g: 0, b: 0, a: 1 }
      )})`}
    />
  );
  const EndIconComponent = endIconName && (
    <DynamicIcon
      iconName={endIconName}
      color={`rgba(${Object.values(
        endIconFillColor || { r: 0, g: 0, b: 0, a: 1 }
      )})`}
    />
  );

  return (
    <StyledButton
      ref={connect}
      startIcon={StartIconComponent}
      endIcon={EndIconComponent}
      className={clsx("rounded w-full px-4 py-2")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...otherProps}
    >
      <Text {...textComponent} text={text} color={textColor} />
    </StyledButton>
  );
};

Button.craft = {
  displayName: "Button",
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
    text: "Button",
    margin: [5, 0, 5, 0],
    padding: [0, 0, 0, 0],
    textComponent: {
      ...Text.craft.props,
      textAlign: "center"
    },
    startIcon: "",
    endIcon: "",
    hoverStartIcon: "", // New
    hoverEndIcon: "", // New
    startIconColor: { r: 0, g: 0, b: 0, a: 1 }, // New
    endIconColor: { r: 0, g: 0, b: 0, a: 1 }, // New
    hoverStartIconColor: { r: 0, g: 0, b: 0, a: 1 }, // New
    hoverEndIconColor: { r: 0, g: 0, b: 0, a: 1 } // New
  },
  related: {
    toolbar: ButtonSettings
  }
};
