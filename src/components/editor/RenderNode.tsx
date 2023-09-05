//src/Components/editor/RenderNode.tsx
import { useNode, useEditor } from "@craftjs/core";
import { ROOT_NODE } from "@craftjs/utils";
import React, { useEffect, useRef, useCallback } from "react";
import ReactDOM from "react-dom";
import { Box, IconButton, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import DynamicIcon from "../../utils/DynamicIcon";

const IndicatorDiv = styled(Box)(({ theme }) => ({
  height: "30px",
  marginTop: "-29px",
  fontSize: "12px",
  lineHeight: "12px",
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0),
  color: "#fff",
  backgroundColor: theme.palette.primary.main,
  position: "fixed",
  zIndex: 9999
}));

export const RenderNode = ({ render }) => {
  const { id } = useNode();
  const { actions, query, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent("selected").contains(id)
  }));

  const {
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent
  } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
    props: node.data.props
  }));

  const currentRef = useRef<HTMLDivElement>();

  const pageContainer = document.querySelector(".page-container");
  if (!pageContainer) {
    console.error("Error: .page-container element not found!");
  }

  console.log("DOM reference:", dom);

  useEffect(() => {
    if (dom) {
      if (isActive || isHover) dom.classList.add("component-selected");
      else dom.classList.remove("component-selected");
    }
  }, [dom, isActive, isHover]);

  const getPos = useCallback((dom: HTMLElement) => {
    const { top, left, bottom } = dom
      ? dom.getBoundingClientRect()
      : { top: 0, left: 0, bottom: 0 };
    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`
    };
  }, []);

  //const position = getPos(dom);
  //console.log("Position:", position);

  const scroll = useCallback(() => {
    const { current: currentDOM } = currentRef;

    if (!currentDOM) return;
    const { top, left } = getPos(dom);
    currentDOM.style.top = top;
    currentDOM.style.left = left;
  }, [dom, getPos]);

  useEffect(() => {
    const craftjsRenderer = document.querySelector(".craftjs-renderer");
    if (craftjsRenderer) {
      //console.log("Adding scroll event listener to .craftjs-renderer");
      craftjsRenderer.addEventListener("scroll", scroll);
      return () => {
        //console.log("Removing scroll event listener from .craftjs-renderer");
        craftjsRenderer.removeEventListener("scroll", scroll);
      };
    } else {
      //console.error("Error: .craftjs-renderer element not found!");
    }
  }, [scroll]);

  //console.log("isHover state:", isHover);
  //console.log("isActive state:", isActive);

  return (
    <>
      {isHover || (isActive && pageContainer)
        ? ReactDOM.createPortal(
            <IndicatorDiv
              ref={currentRef}
              style={{
                left: getPos(dom).left,
                top: getPos(dom).top
              }}
            >
              <Box flexGrow={1} mr={2}>
                {name}
              </Box>
              {moveable ? (
                <Tooltip title="Move">
                  <IconButton size="small" ref={drag}>
                    <DynamicIcon iconName="OpenWith" color="white" />
                  </IconButton>
                </Tooltip>
              ) : null}
              {id !== ROOT_NODE && (
                <Tooltip title="Select Parent">
                  <IconButton
                    size="small"
                    onClick={() => {
                      actions.selectNode(parent);
                    }}
                  >
                    <DynamicIcon iconName="ArrowUpward" color="white" />
                  </IconButton>
                </Tooltip>
              )}
              {deletable ? (
                <Tooltip title="Delete">
                  <IconButton
                    size="small"
                    onMouseDown={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      actions.delete(id);
                    }}
                  >
                    <DynamicIcon iconName="Delete" color="white" />
                  </IconButton>
                </Tooltip>
              ) : null}
            </IndicatorDiv>,
            document.querySelector(".page-container")
          )
        : null}
      {render}
    </>
  );
};
