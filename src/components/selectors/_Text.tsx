// components/user/Text.tsx
import { useNode, UserComponent } from "@craftjs/core";
import {
  FormControl,
  FormLabel,
  Slider,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch
} from "@material-ui/core";
import { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";

const TextSettings = () => {
  const {
    actions: { setProp },
    size,
    text,
    align,
    charLimit,
    showEllipsis
  } = useNode((node) => ({
    size: node.data.props.size,
    text: node.data.props.text,
    align: node.data.props.align,
    charLimit: node.data.props.charLimit,
    showEllipsis: node.data.props.showEllipsis
  }));
  return (
    <div>
      <FormControl className="text-additional-settings" size="small">
        <FormLabel component="legend">Font size</FormLabel>
        <Slider
          value={Number(size) || 12}
          step={1}
          min={7}
          max={50}
          valueLabelDisplay="auto"
          onChange={(_, value) => {
            setProp((props: any) => (props.size = value));
          }}
        />
      </FormControl>
      <FormControl
        className="text-additional-settings"
        size="small"
        style={{ marginTop: "20px" }}
      >
        <FormLabel component="legend">Text Content</FormLabel>
        <TextField
          fullWidth
          value={text}
          onChange={(e) => {
            setProp((props: any) => (props.text = e.target.value));
          }}
        />
      </FormControl>
      <FormControl component="fieldset" style={{ marginTop: "20px" }}>
        <FormLabel component="legend">Alignment</FormLabel>
        <RadioGroup
          value={align}
          onChange={(e) =>
            setProp((props: any) => (props.align = e.target.value))
          }
        >
          <FormControlLabel value="left" control={<Radio />} label="Left" />
          <FormControlLabel value="center" control={<Radio />} label="Center" />
          <FormControlLabel value="right" control={<Radio />} label="Right" />
        </RadioGroup>
      </FormControl>

      <FormControl style={{ marginTop: "20px" }}>
        <FormLabel component="legend">Character Limit</FormLabel>
        <TextField
          type="number"
          value={charLimit}
          onChange={(e) =>
            setProp((props: any) => (props.charLimit = e.target.value))
          }
        />
      </FormControl>

      <FormControl style={{ marginTop: "20px" }}>
        <FormControlLabel
          control={
            <Switch
              checked={showEllipsis}
              onChange={(e) =>
                setProp((props: any) => (props.showEllipsis = e.target.checked))
              }
            />
          }
          label="Show ellipsis when text exceeds limit"
        />
      </FormControl>
    </div>
  );
};

interface TextProps {
  text: string;
  size: string;
  align?: "left" | "center" | "right";
  charLimit?: number;
  showEllipsis?: boolean;
}

export const Text: UserComponent<TextProps> = ({
  text,
  size,
  align = "left",
  charLimit = 100,
  showEllipsis = false
}) => {
  const {
    connectors: { connect, drag },
    actions: { setProp },
    selected
  } = useNode((state) => ({
    selected: state.events.selected
  }));

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (!selected) setEditable(false);
  }, [selected]);

  const displayText =
    showEllipsis && text.length > charLimit
      ? `${text.substring(0, charLimit)}...`
      : text;

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      onDoubleClick={() => setEditable(true)}
    >
      <ContentEditable
        disabled={!editable}
        html={displayText}
        onChange={(e) => setProp((props: any) => (props.text = e.target.value))}
        tagName="p"
        style={{ fontSize: size, textAlign: align }}
        title={showEllipsis && text.length > charLimit ? text : ""}
      />
    </div>
  );
};

Text.craft = {
  rules: {
    canDrag: (node) => node.data.props.text !== "Drag"
  },
  related: {
    settings: TextSettings
  },
  props: {
    align: "left",
    charLimit: 100,
    showEllipsis: false
  }
};
