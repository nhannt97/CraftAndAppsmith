/*
 *   Thic is the base class for input fields that accept string type data by default.
 *   This contains the default styling of an input field.
 *   Components are located at: src/components/selectors/BaseElements/...
 */
// BaseElements/_classes/input/Input.tsx
import React, { ReactNode, useState, useEffect, useRef } from "react";
import { useNode } from "@craftjs/core";
import { Box, TextField, styled, Theme, FormControl } from "@mui/material";
import { Resizer } from "../../../../selectors/Resizer";

const StyledBaseInput = styled(TextField)(({ theme }: { theme: Theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#FFFFFF" : "#1A2027",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow"
    ]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderColor: theme.palette.primary.main
    }
  }
}));

const fontStyling = {
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"'
  ].join(","),
  fontSize: 16,
  color: "#2D3843" // Font color
};

const Label = styled("label")({
  color: "#2D3843"
});

interface BaseInputProps {
  label?: string;
  children?: ReactNode;
  labelPlacement?: "top" | "left";
  variant?: "standard" | "filled" | "outlined";
  onChange?: (value: string) => void;
  value?: string;
}

export const BaseInput: React.FC<BaseInputProps> = ({
  label = "Default Label",
  labelPlacement = "top",
  value: initialValue,
  variant = "standard"
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    connectors: { connect, drag },
    actions: { setProp }
  } = useNode();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = initialValue || "";
    }
  }, [initialValue]);

  const handleChange = () => {
    if (inputRef.current) {
      const newValue = inputRef.current.value;
      setProp((props: BaseInputProps) => {
        props.value = newValue;
      }, 0);
    }
  };

  return (
    <div ref={connect}>
      <Resizer propKey={{ width: "width" }}>
        <Box
          display="flex"
          flexDirection={labelPlacement === "left" ? "row" : "column"}
          alignItems="flex-start"
          style={{ width: "100%" }}
        >
          <div ref={drag}>
            <Label
              style={{
                cursor: "grab",
                flexShrink: 0,
                ...fontStyling,
                margin: labelPlacement === "left" ? "0 10px 0 0" : "0 0 10px 0"
              }}
            >
              {label}
            </Label>
          </div>
          <StyledBaseInput
            variant={variant}
            inputRef={inputRef}
            onChange={handleChange}
            defaultValue={initialValue}
            style={{ width: "100%" }}
          />
        </Box>
      </Resizer>
    </div>
  );
};
