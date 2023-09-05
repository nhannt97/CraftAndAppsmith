//src/components/selectors/Container/index.tsx
import React from "react";
import Box from "@mui/material/Box";

import { ContainerSettings } from "./ContainerSettings";
import { Resizer } from "../Resizer";

export type ContainerProps = {
  background: Record<"r" | "g" | "b" | "a", number>;
  color: Record<"r" | "g" | "b" | "a", number>;
  flexDirection: string;
  alignItems: string;
  justifyContent: string;
  fillSpace: string;
  width: string;
  height: string;
  padding: string[];
  margin: string[];
  marginTop: number;
  marginLeft: number;
  marginBottom: number;
  marginRight: number;
  shadow: number;
  children: React.ReactNode;
  radius: number;
};

const defaultProps = {
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  fillSpace: "no",
  padding: ["0", "0", "0", "0"],
  margin: ["0", "0", "0", "0"],
  background: { r: 243, g: 243, b: 243, a: 1 },
  color: { r: 120, g: 120, b: 120, a: 1 },
  shadow: 3,
  radius: 0,
  width: "100px",
  height: "50px"
};

export const Container = (props: Partial<ContainerProps>) => {
  props = {
    ...defaultProps,
    ...props
  };

  const {
    flexDirection,
    alignItems,
    justifyContent,
    fillSpace,
    background,
    color,
    padding,
    margin,
    shadow,
    radius,
    children,
    width,
    height
  } = props;

  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current && fillSpace === "no") {
      const contentWidth = containerRef.current.scrollWidth;
      const contentHeight = containerRef.current.scrollHeight;
      if (
        contentWidth > parseInt(width, 10) ||
        contentHeight > parseInt(height, 10)
      ) {
        // Adjust the container's size here if needed
      }
    }
  }, [children, width, height, fillSpace]);

  return (
    <Resizer propKey={{ width: "width", height: "height" }}>
      <Box
        ref={containerRef}
        sx={{
          display: "flex",
          flexDirection,
          alignItems,
          justifyContent,
          backgroundColor: `rgba(${Object.values(background)})`,
          color: `rgba(${Object.values(color)})`,
          padding: `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`,
          margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
          boxShadow:
            shadow === 0
              ? "none"
              : `0px 3px 100px ${shadow}px rgba(0, 0, 0, 0.13)`,
          borderRadius: `${radius}px`,
          flex: fillSpace === "yes" ? 1 : "unset",
          width: fillSpace === "yes" ? "auto" : width,
          height: fillSpace === "yes" ? "auto" : height
        }}
      >
        {children}
      </Box>
    </Resizer>
  );
};

Container.craft = {
  displayName: "Container",
  props: defaultProps,
  rules: {
    canDrag: () => true
  },
  related: {
    toolbar: ContainerSettings
  }
};
