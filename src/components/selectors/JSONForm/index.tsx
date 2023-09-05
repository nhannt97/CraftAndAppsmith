import React, { FC, useCallback } from "react";
import { useNode, useEditor } from "@craftjs/core";
import { Resizer } from "../Resizer";
import { getItemsFromProps } from "../../../utils/reactRnd";
import {
  Box,
  Typography,
  FormControl,
  OutlinedInput,
  Button,
  FormHelperText
} from "@mui/material";
import JSONFormSettings from "./Settings";
import Label from "src/components/Label";

export type IProps = {
  title?: string;
  data?: { [key: string]: any };
};

export const getLabel = (propName) => {
  return propName
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};
export const getPropName = (lb) => {
  return lb
    .split(" ")
    .map((w) => w.toLowerCase())
    .join("_");
};

export const JSONFormData = {
  name: {
    label: getLabel("name"),
    value: "John",
    type: "text",
    required: true
  },
  date_of_birth: {
    label: getLabel("date_of_birth"),
    value: "1997-05-18",
    type: "date",
    required: true
  },
  classes: {
    label: getLabel('classes'),
    value: [{
      label: 'Array Item',
      value: 'Math',
      type: 'text',
    }, {
      label: 'Array Item',
      value: 'English',
      type: 'text',
    }],
    type: 'array',
  },
  order: ["name", "date_of_birth", "classes"]
};

export const JSONForm = ({ title = "Form", data = JSONFormData }: IProps) => {
  const {
    connectors: { connect, drag },
    actions: { setProp },
    props
  } = useNode((node) => ({
    props: node.data.props
  }));

  const handleChange = useCallback(
    (key) => (e) => {
      setProp((prop) => (prop[key] = { ...prop[key], value: e.target.value }));
    },
    [setProp]
  );

  return (
    <div
      ref={connect}
      style={{ border: "1px solid #cdd5df", borderRadius: 3, padding: "24px" }}
    >
      <Typography variant="h4" textAlign="center">
        {title}
      </Typography>
      {props.order.map((key) =>
        props[key].hidden ? null : (
          <FormControl
            key={key}
            sx={{ m: 1, width: "25ch", display: "block" }}
            variant="outlined"
          >
            <Label id={key}>{props[key].label}</Label>
            {['text', 'date'].includes(props[key].type)  && (
              <OutlinedInput
                id={key + "input"}
                aria-describedby={key}
                fullWidth
                size="small"
                inputProps={{
                  "aria-label": key
                }}
                type={props[key].type}
                value={props[key].value}
                onChange={handleChange(key)}
              />
            )}
          </FormControl>
        )
      )}
      <Box display="flex" justifyContent="end" mt={5}>
        <Button size="small" variant="outlined" color="primary">
          Reset
        </Button>
        <Button
          style={{ marginLeft: 5 }}
          size="small"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </Box>
    </div>
  );
};

JSONForm.craft = {
  displayName: "JSON Form 1",
  props: JSONFormData,
  related: {
    toolbar: JSONFormSettings
  }
};

export default JSONForm;
