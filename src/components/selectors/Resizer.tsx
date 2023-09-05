/*
import { Box } from "@mui/material";
import { useNode, useEditor } from "@craftjs/core";
import { debounce } from "debounce";
import { Resizable } from "re-resizable";
import React, { Children, cloneElement, useRef, useEffect, useState, useCallback } from "react";
import { styled } from "@mui/system";

import {
  isPercentage,
  pxToPercent,
  percentToPx,
  getElementDimensions
} from "../../utils/numToMeasurement";

interface IndicatorsProps {
  children?: React.ReactNode;
  bound?: "row" | "column";
}

const getIndicatorStyles = (bound: "row" | "column" | undefined) => {
  return {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none" as "none",
    "& span": {
      position: "absolute",
      width: 10,
      height: 10,
      background: "#fff",
      borderRadius: "100%",
      display: "block",
      boxShadow: "0px 0px 12px -1px rgba(0, 0, 0, 0.25)",
      zIndex: 99999,
      pointerEvents: "none" as "none",
      border: "2px solid #36a9e0"
    },
    "& span:nth-child(1)": {
      top: -5,
      left: -5
    },
    "& span:nth-child(2)": {
      top: -5,
      right: -5
    },
    "& span:nth-child(3)": {
      bottom: -5,
      left: -5
    },
    "& span:nth-child(4)": {
      bottom: -5,
      right: -5
    }
  };
};

const Indicators: React.FC<IndicatorsProps> = ({ bound, ...props }) => {
  console.log("Inside Indicators styled, bound value:", bound);

  const styles = getIndicatorStyles(bound);

  return <Box {...props} sx={styles} />;
};

export const Resizer = ({ propKey, children, ...props }) => {
  const {
    justifyContent,
    flexDirection,
    alignItems,
    background,
    color,
    padding,
    margin,
    shadow,
    radius
  } = props;

  const {
    id,
    actions: { setProp },
    connectors: { connect, drag },
    fillSpace,
    nodeWidth,
    nodeHeight,
    parent,
    active,
    inNodeContext
  } = useNode((node) => ({
    parent: node.data.parent,
    active: node.events.selected,
    nodeWidth: node.data.props[propKey.width],
    nodeHeight: node.data.props[propKey.height],
    fillSpace: node.data.props.fillSpace
  }));

  const { isRootNode, parentDirection } = useEditor((state, query) => {
    return {
      parentDirection:
        parent &&
        state.nodes[parent] &&
        state.nodes[parent].data.props.flexDirection,
      isRootNode: query.node(id).isRoot()
    };
  });

  //console.log("fillSpace value:", fillSpace);
  //console.log("parentDirection value:", parentDirection);
  /*console.log(
    "Bound value:",
    fillSpace === "yes" ? parentDirection : undefined
  );

  

  const resizable = useRef<any | null>(null);
  const resizableRef = (instance: Resizable | null) => {
    resizable.current = instance;
  };
  //const resizable = useRef<HTMLDivElement | null>(null);
  const isResizing = useRef<Boolean>(false);
  const editingDimensions = useRef<any>(null);
  const nodeDimensions = useRef(null);
  nodeDimensions.current = { width: nodeWidth, height: nodeHeight };


  const [internalDimensions, setInternalDimensions] = useState({
    width: nodeWidth,
    height: nodeHeight
  });

  const updateInternalDimensionsInPx = useCallback(() => {
    const { width: nodeWidth, height: nodeHeight } = nodeDimensions.current;

    const width = percentToPx(
      nodeWidth,
      resizable.current &&
        getElementDimensions(resizable.current.resizable.parentElement).width
    );
    const height = percentToPx(
      nodeHeight,
      resizable.current &&
        getElementDimensions(resizable.current.resizable.parentElement).height
    );

    setInternalDimensions({
      width,
      height
    });
  }, []);

  const updateInternalDimensionsWithOriginal = useCallback(() => {
    const { width: nodeWidth, height: nodeHeight } = nodeDimensions.current;
    setInternalDimensions({
      width: nodeWidth,
      height: nodeHeight
    });
  }, []);

  const getUpdatedDimensions = (width, height) => {
    const dom = (resizable.current as any).resizable || resizable.current;
    if (!dom)
      return {
        width: nodeDimensions.current.width,
        height: nodeDimensions.current.height
      };

    const currentWidth = parseInt(editingDimensions.current.width, 10);
    const currentHeight = parseInt(editingDimensions.current.height, 10);

    return {
      width: currentWidth + parseInt(width, 10),
      height: currentHeight + parseInt(height, 10)
    };
  };

  useEffect(() => {
    if (!isResizing.current) updateInternalDimensionsWithOriginal();
  }, [nodeWidth, nodeHeight, updateInternalDimensionsWithOriginal]);

  useEffect(() => {
    const listener = debounce(updateInternalDimensionsWithOriginal, 1);
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [updateInternalDimensionsWithOriginal]);

  useEffect(() => {
    if (resizable.current && resizable.current.resizable) {
      const parentElem = resizable.current.resizable.parentElement;
      //console.log("Parent Element:", parentElem);
      //console.log("Parent Element Styles:", window.getComputedStyle(parentElem));
    }
  }, []);

  const boundValue = fillSpace === "yes" ? parentDirection : "row"; // Defaulting to "row"
  //console.log("Bound value:", boundValue);

  // Clone children and pass padding and margin props
  const updatedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const propsWithStyle = child.props as { style?: React.CSSProperties };
      return React.cloneElement(child, {
        ...propsWithStyle,
        style: {
          ...propsWithStyle.style, // Now TypeScript knows that this is a React.CSSProperties or undefined
          margin: margin ? `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px` : '0px',
          padding: padding ? `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px` : '0px',
        },
      });
    }
    return child;
  });
  


  return (
    <Box
      {...props}
      component={Resizable}
      enable={[
        "top",
        "left",
        "bottom",
        "right",
        "topLeft",
        "topRight",
        "bottomLeft",
        "bottomRight"
      ].reduce((acc: any, key) => {
        acc[key] = active && inNodeContext;
        return acc;
      }, {})}
      handleComponent={{
        top: <span />,
        right: <span />,
        bottom: <span />,
        left: <span />,
        topLeft: <span />,
        topRight: <span />,
        bottomLeft: <span />,
        bottomRight: <span />
      }}
      sx={{
        justifyContent: justifyContent,
        flexDirection: flexDirection,
        alignItems: alignItems,
        backgroundColor: background
          ? `rgba(${Object.values(background)})`
          : "transparent",
        color: color ? `rgba(${Object.values(color)})` : "black",
        padding: padding
          ? `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`
          : "0px",
        margin: margin
          ? `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`
          : "0px",
        boxShadow:
          shadow === 0
            ? "none"
            : shadow
            ? `0px 3px 100px ${shadow}px rgba(0, 0, 0, 0.13)`
            : "none",
        borderRadius: radius ? `${radius}px` : "0px",

        flex: fillSpace === "yes" ? 1 : "unset"
      }}
      ref={(ref) => {
        if (ref) {
          resizable.current = ref; // Store the Resizable instance
          connect(resizable.current.resizable); // Connect the DOM node to Craft.js
        }
      }}
      size={internalDimensions}
      onResizeStart={(e) => {
        //console.log("Resize started");
        updateInternalDimensionsInPx();
        e.preventDefault();
        e.stopPropagation();
        const dom = (resizable.current as any).resizable || resizable.current;
        if (!dom) return;
        editingDimensions.current = {
          width: dom.getBoundingClientRect().width,
          height: dom.getBoundingClientRect().height
        };
        isResizing.current = true;
      }}
      onResize={(_, __, ___, d) => {
        //console.log("Resizing:", d);
        const dom = (resizable.current as any).resizable || resizable.current;
        let { width, height }: any = getUpdatedDimensions(d.width, d.height);
        if (isPercentage(nodeWidth))
          width =
            pxToPercent(width, getElementDimensions(dom.parentElement).width) +
            "%";
        else width = `${width}px`;

        if (isPercentage(nodeHeight))
          height =
            pxToPercent(
              height,
              getElementDimensions(dom.parentElement).height
            ) + "%";
        else height = `${height}px`;

        if (isPercentage(width) && dom.parentElement.style.width === "auto") {
          width = editingDimensions.current.width + d.width + "px";
        }

        if (isPercentage(height) && dom.parentElement.style.height === "auto") {
          height = editingDimensions.current.height + d.height + "px";
        }

        setProp((prop: any) => {
          prop[propKey.width] = width;
          prop[propKey.height] = height;
        }, 500);
      }}
      onResizeStop={() => {
        //console.log("Resize stopped");
        isResizing.current = false;
        updateInternalDimensionsWithOriginal();
      }}
      {...props}
    >
      {updatedChildren}
      {active && (
        <Indicators bound={boundValue}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </Indicators>
      )}
    </Box>
  );
};
*/

/////////////////////////////////

// /src/components/selectors/Resizer.tsx
import { Box } from "@mui/material";
import { useNode, useEditor } from "@craftjs/core";
import { debounce } from "debounce";
import { Resizable } from "re-resizable";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { styled } from "@mui/system";

import {
  isPercentage,
  pxToPercent,
  percentToPx,
  getElementDimensions
} from "../../utils/numToMeasurement";

interface IndicatorsProps {
  children?: React.ReactNode;
  bound?: "row" | "column";
}

const getIndicatorStyles = (bound: "row" | "column" | undefined) => {
  return {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none" as "none",
    "& span": {
      position: "absolute",
      width: 10,
      height: 10,
      background: "#fff",
      borderRadius: "100%",
      display: "block",
      boxShadow: "0px 0px 12px -1px rgba(0, 0, 0, 0.25)",
      zIndex: 99999,
      pointerEvents: "none" as "none",
      border: "2px solid #36a9e0"
    },
    "& span:nth-child(1)": {
      top: -5,
      left: -5
    },
    "& span:nth-child(2)": {
      top: -5,
      right: -5
    },
    "& span:nth-child(3)": {
      bottom: -5,
      left: -5
    },
    "& span:nth-child(4)": {
      bottom: -5,
      right: -5
    }
  };
};

const Indicators: React.FC<IndicatorsProps> = ({ bound, ...props }) => {
  console.log("Inside Indicators styled, bound value:", bound);

  const styles = getIndicatorStyles(bound);

  return <Box {...props} sx={styles} />;
};

export const Resizer = ({ propKey, children, ...props }) => {
  const {
    justifyContent,
    flexDirection,
    alignItems,
    background,
    color,
    padding,
    margin,
    shadow,
    radius
  } = props;

  const {
    id,
    actions: { setProp },
    connectors: { connect, drag },
    fillSpace,
    nodeWidth,
    nodeHeight,
    parent,
    active,
    inNodeContext
  } = useNode((node) => ({
    parent: node.data.parent,
    active: node.events.selected,
    nodeWidth: node.data.props[propKey.width],
    nodeHeight: node.data.props[propKey.height],
    fillSpace: node.data.props.fillSpace
  }));

  const { isRootNode, parentDirection } = useEditor((state, query) => {
    return {
      parentDirection:
        parent &&
        state.nodes[parent] &&
        state.nodes[parent].data.props.flexDirection,
      isRootNode: query.node(id).isRoot()
    };
  });

  //console.log("fillSpace value:", fillSpace);
  //console.log("parentDirection value:", parentDirection);
  /*console.log(
    "Bound value:",
    fillSpace === "yes" ? parentDirection : undefined
  );*/

  const resizable = useRef<any | null>(null);
  const resizableRef = (instance: Resizable | null) => {
    resizable.current = instance;
  };
  //const resizable = useRef<HTMLDivElement | null>(null);
  const isResizing = useRef<Boolean>(false);
  const editingDimensions = useRef<any>(null);
  const nodeDimensions = useRef(null);
  nodeDimensions.current = { width: nodeWidth, height: nodeHeight };

  /**
   * Using an internal value to ensure the width/height set in the node is converted to px
   * because for some reason the <re-resizable /> library does not work well with percentages.
   */

  const [internalDimensions, setInternalDimensions] = useState({
    width: nodeWidth,
    height: nodeHeight
  });

  const updateInternalDimensionsInPx = useCallback(() => {
    const { width: nodeWidth, height: nodeHeight } = nodeDimensions.current;

    const width = percentToPx(
      nodeWidth,
      resizable.current &&
        getElementDimensions(resizable.current.resizable.parentElement).width
    );
    const height = percentToPx(
      nodeHeight,
      resizable.current &&
        getElementDimensions(resizable.current.resizable.parentElement).height
    );

    setInternalDimensions({
      width,
      height
    });
  }, []);

  const updateInternalDimensionsWithOriginal = useCallback(() => {
    const { width: nodeWidth, height: nodeHeight } = nodeDimensions.current;
    setInternalDimensions({
      width: nodeWidth,
      height: nodeHeight
    });
  }, []);

  const getUpdatedDimensions = (width, height) => {
    const dom = (resizable.current as any).resizable || resizable.current;
    if (!dom)
      return {
        width: nodeDimensions.current.width,
        height: nodeDimensions.current.height
      };

    const currentWidth = parseInt(editingDimensions.current.width, 10);
    const currentHeight = parseInt(editingDimensions.current.height, 10);

    return {
      width: currentWidth + parseInt(width, 10),
      height: currentHeight + parseInt(height, 10)
    };
  };

  useEffect(() => {
    if (!isResizing.current) updateInternalDimensionsWithOriginal();
  }, [nodeWidth, nodeHeight, updateInternalDimensionsWithOriginal]);

  useEffect(() => {
    const listener = debounce(updateInternalDimensionsWithOriginal, 1);
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [updateInternalDimensionsWithOriginal]);

  useEffect(() => {
    if (resizable.current && resizable.current.resizable) {
      const parentElem = resizable.current.resizable.parentElement;
      //console.log("Parent Element:", parentElem);
      //console.log("Parent Element Styles:", window.getComputedStyle(parentElem));
    }
  }, []);

  const boundValue = fillSpace === "yes" ? parentDirection : "row"; // Defaulting to "row"
  //console.log("Bound value:", boundValue);

  return (
    <Box
      {...props}
      component={Resizable}
      enable={[
        "top",
        "left",
        "bottom",
        "right",
        "topLeft",
        "topRight",
        "bottomLeft",
        "bottomRight"
      ].reduce((acc: any, key) => {
        acc[key] = active && inNodeContext;
        return acc;
      }, {})}
      handleComponent={{
        top: <span />,
        right: <span />,
        bottom: <span />,
        left: <span />,
        topLeft: <span />,
        topRight: <span />,
        bottomLeft: <span />,
        bottomRight: <span />
      }}
      sx={{
        justifyContent: justifyContent,
        flexDirection: flexDirection,
        alignItems: alignItems,
        backgroundColor: background
          ? `rgba(${Object.values(background)})`
          : "transparent",
        color: color ? `rgba(${Object.values(color)})` : "black",
        padding: padding
          ? `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`
          : "0px",
        margin: margin
          ? `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`
          : "0px",
        boxShadow:
          shadow === 0
            ? "none"
            : shadow
            ? `0px 3px 100px ${shadow}px rgba(0, 0, 0, 0.13)`
            : "none",
        borderRadius: radius ? `${radius}px` : "0px",

        flex: fillSpace === "yes" ? 1 : "unset"
      }}
      ref={(ref) => {
        if (ref) {
          resizable.current = ref; // Store the Resizable instance
          connect(resizable.current.resizable); // Connect the DOM node to Craft.js
        }
      }}
      size={internalDimensions}
      onResizeStart={(e) => {
        //console.log("Resize started");
        updateInternalDimensionsInPx();
        e.preventDefault();
        e.stopPropagation();
        const dom = (resizable.current as any).resizable || resizable.current;
        if (!dom) return;
        editingDimensions.current = {
          width: dom.getBoundingClientRect().width,
          height: dom.getBoundingClientRect().height
        };
        isResizing.current = true;
      }}
      onResize={(_, __, ___, d) => {
        //console.log("Resizing:", d);
        const dom = (resizable.current as any).resizable || resizable.current;
        let { width, height }: any = getUpdatedDimensions(d.width, d.height);
        if (isPercentage(nodeWidth))
          width =
            pxToPercent(width, getElementDimensions(dom.parentElement).width) +
            "%";
        else width = `${width}px`;

        if (isPercentage(nodeHeight))
          height =
            pxToPercent(
              height,
              getElementDimensions(dom.parentElement).height
            ) + "%";
        else height = `${height}px`;

        if (isPercentage(width) && dom.parentElement.style.width === "auto") {
          width = editingDimensions.current.width + d.width + "px";
        }

        if (isPercentage(height) && dom.parentElement.style.height === "auto") {
          height = editingDimensions.current.height + d.height + "px";
        }

        setProp((prop: any) => {
          prop[propKey.width] = width;
          prop[propKey.height] = height;
        }, 500);
      }}
      onResizeStop={() => {
        //console.log("Resize stopped");
        isResizing.current = false;
        updateInternalDimensionsWithOriginal();
      }}
      {...props}
    >
      {children}
      {active && (
        <Indicators bound={boundValue}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </Indicators>
      )}
    </Box>
  );
};
