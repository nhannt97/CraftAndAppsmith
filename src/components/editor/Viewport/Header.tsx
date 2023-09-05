// src/Components/editor/Viewport/Header.tsx
import { useEditor } from "@craftjs/core";
import { Tooltip, Box, Button, Snackbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import React, { useState } from "react";
import copy from "copy-to-clipboard";
import lz from "lzutf8";

import DynamicIcon from "../../../utils/DynamicIcon";
import { Margin } from "@mui/icons-material";

const HeaderDiv = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "48px",
  zIndex: 99999,
  position: "relative",
  padding: "0px 0px",
  background: "#FFF",
  display: "flex",
  borderBottom: "1px solid #cdd5df"
}));

const StyledButton = styled(Button)(({ theme, enabled }: any) => ({
  display: "flex",
  alignItems: "center",
  padding: "5px 15px",
  margin: "10px",
  borderRadius: 5,
  color: "#4c5664",
  fontSize: "13px",
  backgroundColor: enabled ? "#f1f5f9" : "#0000FF",
  "&:hover": {
    backgroundColor: enabled ? alpha("#f1f5f9", 0.4) : alpha("#0000FF", 0.4)
  },
  "& svg": {
    marginRight: "6px",
    width: "18px",
    height: "18px",
    fill: "#4c5664",
    opacity: 0.9
  }
}));

const Item = styled(Box)(({ theme, disabled }) => ({
  marginRight: "10px",
  cursor: "pointer",
  "& svg": {
    width: "20px",
    height: "20px",
    fill: "#707070"
  },
  ...(disabled && {
    opacity: 0.5,
    cursor: "not-allowed"
  })
}));

export const Header = () => {
  const { enabled, canUndo, canRedo, actions, query } = useEditor(
    (state, query) => ({
      enabled: state.options.enabled,
      canUndo: query.history.canUndo(),
      canRedo: query.history.canRedo()
    })
  );

  const [snackbarMessage, setSnackbarMessage] = useState();
  return (
    <HeaderDiv className="header">
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        width="100%"
        px={4}
      >
        {enabled && (
          <Box display="flex" flexGrow={1}>
            <Tooltip title="Undo">
              <Item disabled={!canUndo} onClick={() => actions.history.undo()}>
                <DynamicIcon iconName="Undo" color="grey" />
              </Item>
            </Tooltip>
            <Tooltip title="Redo">
              <Item disabled={!canRedo} onClick={() => actions.history.redo()}>
                <DynamicIcon iconName="Redo" color="grey" />
              </Item>
            </Tooltip>
          </Box>
        )}
        <Box display="flex">
          <StyledButton
            enabled={enabled}
            onClick={() => {
              actions.setOptions((options) => (options.enabled = !enabled));
            }}
          >
            <DynamicIcon
              iconName={enabled ? "Check" : "Edit"}
              color={"#4c5664"}
            />
            {enabled ? "Finish Editing" : "Edit"}
          </StyledButton>
          <Button
            className="copy-state-btn"
            size="small"
            onClick={() => {
              const json = query.serialize();
              //copy(lz.encodeBase64(lz.compress(json)));
              copy(json);
              setSnackbarMessage("State copied to clipboard");
            }}
            startIcon={<DynamicIcon iconName={"CopyAll"} color={"#4c5664"} />}
            variant="text"
            sx={{
              borderRadius: "5px",
              boxShadow: "none",
              color: "#4c5664",
              textTransform: "capitalize",
              backgroundColor: "#f1f5f9",
              paddingX: 1,
              margin: 1
            }}
          >
            Copy state
          </Button>
          <Snackbar
            autoHideDuration={1000}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={!!snackbarMessage}
            onClose={() => setSnackbarMessage(null)}
            message={<span>{snackbarMessage}</span>}
          />
        </Box>
      </Box>
    </HeaderDiv>
  );
};
