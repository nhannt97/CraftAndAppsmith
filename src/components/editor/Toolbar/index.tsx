import { useEditor } from "@craftjs/core";
import React, { useEffect } from "react";
import { Typography, Box } from "@mui/material";

export * from "./ToolbarItem";
export * from "./ToolbarSection";
export * from "./ToolbarTextInput";
export * from "./ToolbarDropdown";
export * from "./ToolbarTabs";
export * from "./ToolbarColorPickerButton";

export const Toolbar = () => {
  const { active, related, actions, nodes } = useEditor((state, query) => {
    // TODO: handle multiple selected elements
    const currentlySelectedNodeId = query.getEvent("selected").first();
    return {
      active: currentlySelectedNodeId,
      related:
        currentlySelectedNodeId && state.nodes[currentlySelectedNodeId].related,
        nodes: Object.values(state.nodes),
        actions: state.handlers
    };
  });

  return (
    <Box py={1} height="100%">
      {active && related.toolbar && React.createElement(related.toolbar)}
      {!active && (
        <Box
          px={5}
          py={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
          height="100%"
          justifyContent="center"
          sx={{
            color: "rgba(0, 0, 0, 0.56)",
            fontSize: "11px",
            textAlign: "center"
          }}
        >
          <Typography variant="body1" paddingBottom={3}>
            Click on a component to start editing.
          </Typography>
          <Typography variant="body1" paddingBottom={3}>
            Double click on layers to edit their label.
          </Typography>
          <Typography variant="body1" paddingBottom={3}>
            Click and hold to drag, sort and components.
          </Typography>
        </Box>
      )}
    </Box>
  );
};
