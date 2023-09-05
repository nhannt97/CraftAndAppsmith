// src/components/editor/Toolbar/ToolbarDropdown.tsx

import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import Label from "src/components/Label";

export const ToolbarDropdown = ({ title, value, onChange, fullWidth, size, children }: any) => {
  return (
    <FormControl fullWidth={fullWidth} size={size}>
      <Label>{title}</Label>
      <Select value={value} onChange={(e) => onChange(e.target.value)}>
        {children}
      </Select>
    </FormControl>
  );
};
