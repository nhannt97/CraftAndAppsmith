//src/components/selectors/Text/index.tsx
import { useNode, useEditor } from "@craftjs/core";
import React from "react";
import ContentEditable from "react-contenteditable";
import Typography from "@mui/material/Typography";
import { TextSettings } from "./TextSettings";

export type TextProps = {
  fontSize: string;
  textAlign: string;
  fontWeight: string;
  color: Record<"r" | "g" | "b" | "a", number>;
  shadow: number;
  text: string;
  margin: [number, number, number, number];
};

type CraftProps = {
  displayName: string;
  props: TextProps;
  related: {
    toolbar: typeof TextSettings;
  };
};

type TextComponentType = React.FC<Partial<TextProps>> & {
  craft?: CraftProps;
};

export const Text: TextComponentType = ({
  fontSize,
  textAlign,
  fontWeight,
  color,
  shadow,
  text,
  margin
}) => {
  const {
    connectors: { connect },
    setProp
  } = useNode();
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled
  }));

  return enabled ? (
    <ContentEditable
      innerRef={connect}
      html={text}
      disabled={!enabled}
      onChange={(e) => {
        setProp((prop) => (prop.text = e.target.value), 500);
      }}
      tagName="h2"
      style={{
        width: "100%",
        margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
        color: `rgba(${Object.values(color)})`,
        fontSize: `${fontSize}px`,
        textShadow: `0px 0px 2px rgba(0,0,0,${(shadow || 0) / 100})`,
        fontWeight,
        textAlign
      }}
    />
  ) : (
    <Typography
      variant="h2"
      sx={{
        width: "100%",
        margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
        color: `rgba(${Object.values(color)})`,
        fontSize: `${fontSize}px`,
        textShadow: `0px 0px 2px rgba(0,0,0,${(shadow || 0) / 100})`,
        fontWeight,
        textAlign
      }}
    >
      {text}
    </Typography>
  );
};

Text.craft = {
  displayName: "Text",
  props: {
    fontSize: "15",
    textAlign: "left",
    fontWeight: "500",
    color: { r: 92, g: 90, b: 90, a: 1 },
    margin: [0, 0, 0, 0],
    shadow: 0,
    text: "Text"
  },
  related: {
    toolbar: TextSettings
  }
};

export default Text;
