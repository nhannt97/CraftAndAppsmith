//src/components/editor/Toolbar/ToolbarColorPicker.tsx
import React, { useState, useEffect, useRef } from "react";
import { Button, Popper, Typography, Box } from "@mui/material";
import { SketchPicker as ColorPicker } from "react-color";

const ToolbarColorPickerButton = ({
  label,
  color,
  onChange,
  padding = { top: 6, bottom: 6, left: 12, right: 12 }
}) => {
  const [active, setActive] = useState(false);
  const pickerRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setActive(!active);
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    function handleDocumentClick(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setActive(false);
      }
    }

    if (active) {
      document.addEventListener("mousedown", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [active]);

  // Define an array of custom color options
  const customColors = [
    "#000000",
    "#FFFFFF",
    "#0A125D",
    "#276BF0",
    "#67EFE3",
    "#52586D",
    "#53C999",
    "#2D8ABB",
    "#D83835",
    "#ef4444",
    "#F2AF4C",
    "#553DE9",
    "#3b82f6",
    "#22c55e",
    "#f4f4f5",
    "#d4d4d8",
    "#71717a",
    "#3f3f46",
    "#18181b"
    // Add more color values as needed
  ];

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={1}
      p={`${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`}
      width="100%"
    >
      <Typography variant="body2">{label}</Typography>
      <Button
        variant="contained"
        sx={{
          width: "24px",
          height: "24px",
          backgroundColor: color
            ? `rgba(${Object.values(color)})`
            : "transparent",
          padding: 0,
          minWidth: 0,
          "&:hover": {
            backgroundColor: color
              ? `rgba(${Object.values(color)})`
              : "transparent"
          }
        }}
        onClick={handleClick}
      />
      <Popper open={active} anchorEl={anchorEl} placement="bottom-start">
        <div ref={pickerRef}>
          <ColorPicker
            color={color}
            presetColors={customColors}
            onChange={(newColor) => {
              onChange(newColor.rgb);
            }}
          />
        </div>
      </Popper>
    </Box>
  );
};

export default ToolbarColorPickerButton;
