import { FormControlLabel, Radio } from "@mui/material";
import { styled } from "@mui/material/styles";
import classnames from "classnames";
import React from "react";

const StyledIcon = styled("span")({
  borderRadius: "100%",
  width: 15,
  height: 15,
  background: "transparent",
  position: "relative",
  padding: "3px",
  border: "2px solid rgb(142, 142, 142)",
  transition: "0.4s cubic-bezier(0.19, 1, 0.22, 1)",
  "&.checked": {
    background: "rgb(19, 115, 230)",
    borderColor: "transparent",
    "&:before": {
      content: '""',
      display: "block",
      width: "100%",
      height: "100%",
      borderRadius: "100%",
      background: "#fff"
    }
  }
});

// Inspired by blueprintjs
function StyledRadio(props) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<StyledIcon className="checked" />}
      icon={<StyledIcon />}
      {...props}
    />
  );
}

const StyledLabel = styled(FormControlLabel)({
  "& .MuiFormControlLabel-label": {
    fontSize: "15px"
  }
});

export const ToolbarRadio = ({ value, label }: any) => {
  return <StyledLabel value={value} control={<StyledRadio />} label={label} />;
};
