//src/components/selectors/Text/Text.tsx
import { useNode, useEditor } from "@craftjs/core";
import React from "react";
import ContentEditable from "react-contenteditable";
import Typography from "@mui/material/Typography";
import { TextSettings } from "./TextSettings";

export type TextProps = {
  text: string;
  fontSize: string;
  textAlign: string;
  fontWeight: string;
  color: Record<"r" | "g" | "b" | "a", number>;
  shadow: number;
  overflow: "scroll" | "truncate" | "none";
  visibility: boolean;
  height: string; // you can define this as per your requirements
  margin: [number, number, number, number];
  width: string;
};

export const Text = (props: TextProps) => {
  const {
    connectors: { connect },
    setProp
  } = useNode();
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled
  }));

  const {
    text,
    fontSize,
    textAlign,
    fontWeight,
    color,
    shadow,
    overflow,
    visibility,
    height,
    width,
    margin
  } = props;

  const styles = {
    width: "auto",
    margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
    color: `rgba(${Object.values(color)})`,
    fontSize: `${fontSize}px`,
    textShadow: `0px 0px 2px rgba(0,0,0,${(shadow || 0) / 100})`,
    fontWeight,
    textAlign,
    overflow:
      overflow === "scroll"
        ? "auto"
        : overflow === "truncate"
        ? "hidden"
        : undefined,
    whiteSpace: overflow === "truncate" ? "nowrap" : undefined,
    textOverflow: overflow === "truncate" ? "ellipsis" : undefined,
    visibility: visibility ? "visible" : "hidden",
    height // Handle height as needed
  };

  return enabled ? (
    <ContentEditable
      innerRef={connect}
      html={text}
      disabled={!enabled}
      onChange={(e) => {
        setProp((prop) => (prop.text = e.target.value), 500);
      }}
      tagName="h2"
      style={styles}
    />
  ) : (
    <Typography variant="h2" sx={styles}>
      {text}
    </Typography>
  );
};

Text.craft = {
  displayName: "Text",
  props: {
    text: "Text",
    fontSize: "15",
    textAlign: "left",
    fontWeight: "500",
    color: { r: 92, g: 90, b: 90, a: 1 },
    shadow: 0,
    overflow: "none",
    visibility: true,
    height: "auto",
    margin: [0, 0, 0, 0],
    width: "100px"
  },
  related: {
    toolbar: TextSettings
  }
};

export default Text;
