// components/Toolbox.tsx
import { Box, Typography, Grid, Button as MaterialButton } from "@mui/material";
import { Element, useEditor } from "@craftjs/core";

import { Button } from "./user/Button";
import { Text } from "./user/Text";
import { Container } from "./user/Container";
import { Card } from "./user/Card";
import { TextInput } from "./user/TextInput";

export const Toolbox = () => {
  const {
    connectors: { create }
  } = useEditor();

  return (
    <Box px={2} py={2}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={1}
      >
        <Box pb={2}>
          <Typography>Drag to add</Typography>
        </Box>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref) => {
              if (ref)
                create(
                  ref,
                  <Button size="small" variant="outlined" color="primary">
                    Click me
                  </Button>
                );
            }}
            variant="contained"
          >
            Button
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref) => {
              if (ref) create(ref, <Text size="14" text="Hi world" />);
            }}
            variant="contained"
          >
            Text
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref) => {
              if (ref)
                create(
                  ref,
                  <Element
                    is={Container}
                    background="white"
                    padding={20}
                    canvas
                  />
                );
            }}
            variant="contained"
          >
            Container
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref) => {
              if (ref) create(ref, <Card background="white" padding={20} />);
            }}
            variant="contained"
          >
            Card
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton variant="contained">TextField</MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref) => {
              if (ref) create(ref, <TextInput placeholder="Enter text" />);
            }}
            variant="contained"
          >
            TextInput
          </MaterialButton>
        </Grid>
      </Grid>
    </Box>
  );
};
