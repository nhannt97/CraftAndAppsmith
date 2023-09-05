// src/components/editor/Viewport/index.tsx
import { useEditor } from "@craftjs/core";
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Toolbox } from "./Toolbox";

/*******************
Styling utilizing MUI5 for our Viewport
*******************/
//Contains header
const ViewPort = styled(Box)(({ theme }) => ({
  display: "block",
  height: "49px",
  overflow: "hidden",
  width: "100%",
  position: "fixed",
  top: "0px",
  left: "0px"
}));

//below header, contains wid box that wraps toolbar, center, and sidebar
//contains toolbar on left
const FlexFullFixed = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100%",
  overflow: "hidden",
  flexDirection: "row",
  width: "100%",
  position: "fixed"
}));

//beside toolbar, contains row of items such as center and sidebar on right
const PageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexGrow: 1,
  height: "100%",
  flexDirection: "row"
}));

const RendererContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  height: "100%",
  width: "100%",
  transition: "0.4s cubic-bezier(0.19, 1, 0.22, 1)",
  paddingBottom: theme.spacing(2),
  overflow: "auto",
  backgroundColor: "#FFFFFF"
}));

const RelativeFlexCol = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "100%",
  flexDirection: "column",
  display: "flex",
  alignItems: "center",
  paddingTop: theme.spacing(2),
  backgroundColor: "#F5F5F5"
}));

const FlexCenter = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  paddingTop: theme.spacing(1.5),
  fontSize: "0.75rem",
  color: "lightgray" // replace with the actual color value
}));

export const Viewport: React.FC<{ children?: React.ReactNode }> = ({
  children
}) => {
  const {
    enabled,
    connectors,
    actions: { setOptions }
  } = useEditor((state) => ({
    enabled: state.options.enabled
  }));

  //const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!window) {
      return;
    }

    if (typeof window !== "undefined") {
      window.requestAnimationFrame(() => {
        // Notify doc site
        window.parent.postMessage(
          {
            LANDING_PAGE_LOADED: true
          },
          "*"
        );

        setTimeout(() => {
          setOptions((options) => {
            options.enabled = true;
          });
        }, 200);
      });
    }
  }, [setOptions]);

  return (
    <ViewPort className="viewport">
      {/* Main Header of the Application */}
      <Header />

      <FlexFullFixed className="flex h-full overflow-hidden flex-row w-full fixed">
        <Toolbox />

        <PageContainer className="page-container flex flex-1 h-full flex-col">
          <RendererContainer
            className="craftjs-renderer flex-1 h-full w-full transition pb-8 overflow-auto"
            data-enabled={enabled}
            ref={(ref: HTMLElement) =>
              connectors.select(connectors.hover(ref, null), null)
            }
          >
            <RelativeFlexCol className="relative flex-col flex items-center pt-8">
              {children}
            </RelativeFlexCol>
            <FlexCenter className="flex items-center justify-center w-full pt-6 text-xs text-light-gray-2">
              {/* content */}
            </FlexCenter>
          </RendererContainer>

          <Sidebar />
        </PageContainer>
      </FlexFullFixed>
    </ViewPort>
  );
};
