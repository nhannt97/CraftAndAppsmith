// pages/index.tsx
import React from "react";

import { Editor, Frame, Element } from "@craftjs/core";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Viewport, RenderNode } from "../components/editor";
import { Container, Text } from "../components/selectors";
import { Button } from "../components/selectors/Button";
import { IconButton1 } from "../components/selectors/IconButton1";
import { Video } from "../components/selectors/Video";
import { TextInput } from "src/components/selectors/BaseElements/Input/TextField";
import { JSONForm } from "src/components/selectors/JSONForm";

import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Poppins",
      "acumin-pro",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif"
    ].join(",")
  }
});

const StyledBox = styled(Box)(({ theme }) => ({
  /*  display: "flex",
  height: "100vh",
  overflow: "hidden",
  backgroundColor: theme.palette.background.default,
  boxShadow: theme.shadows[3]*/
}));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledBox>
        <Editor
          resolver={{
            Container,
            Text,
            Button,
            Video,
            TextInput,
            IconButton1,
            JSONForm
          }}
          enabled={true}
          onRender={RenderNode}
        >
          <Viewport>
            <Frame>
              <Element
                canvas
                is={Container}
                width="800px"
                height="auto"
                background={{ r: 255, g: 255, b: 255, a: 1 }}
                padding={["40", "40", "40", "40"]}
                custom={{ displayName: "App" }}
              >
                <JSONForm />
              </Element>
            </Frame>
          </Viewport>
        </Editor>
      </StyledBox>
    </ThemeProvider>
  );
}

export default App;
