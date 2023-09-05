// components/SettingsPanel.tsx
import React from "react";
import {
  Box,
  Chip,
  Grid,
  Typography,
  Button as MaterialButton,
  FormControl,
  FormLabel,
  Slider
} from "@material-ui/core";
import { useEditor } from "@craftjs/core";

export const SettingsPanel = () => {
  const { selected } = useEditor((state) => {
    const currentNodeId = state.events.selected.values().next().value;
    const settingElement = currentNodeId
      ? state.nodes[currentNodeId]?.related.settings
      : null;

    return {
      selected: settingElement
    };
  });

  return (
    <Box bgcolor="rgba(0, 0, 0, 0.06)" mt={2} px={2} py={2}>
      <Grid container direction="column" spacing={0}>
        <Grid item>
          <Box pb={2}>
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography variant="subtitle1">Selected</Typography>
              </Grid>
              <Grid item>
                <Chip size="small" color="primary" label="Selected" />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {selected && React.createElement(selected)}
        <MaterialButton variant="contained" color="default">
          Delete
        </MaterialButton>
      </Grid>
    </Box>
  );
};
