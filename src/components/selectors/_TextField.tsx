import { useNode, UserComponent } from "@craftjs/core";
import { FormControl, FormLabel, Slider } from "@material-ui/core";
import { useEffect, useState } from "react";
import { TextField } from "@material-ui/core"; // <-- Import TextField

const TextSettings = () => {
  const {
    actions: { setProp },
    size,
    text // <-- Get the text prop
  } = useNode((node) => ({
    size: node.data.props.size,
    text: node.data.props.text // <-- Get the text prop
  }));

  return (
    <div>
      <FormControl className="text-additional-settings" size="small">
        <FormLabel component="legend">Font size</FormLabel>
        <Slider
          value={size}
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
    </div>
  );
};
