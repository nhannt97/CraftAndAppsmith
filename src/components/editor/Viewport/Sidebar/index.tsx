//src/Components/editor/Viewport/Sidebar/index.tsx
import { useEditor } from "@craftjs/core";
import { Layers } from "@craftjs/layers";
import React, { useState } from "react";
import { Box, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

import { SidebarItem } from "./SidebarItem";
import { Toolbar } from "../../Toolbar";
import DynamicIcon from "../../../../utils/DynamicIcon"; // Import the DynamicIcon utility

const SidebarDiv = styled(Box)(({ theme }) => ({
  width: "400px",
  background: "#fff",
  "&[data-enabled=true]": {
    opacity: 1,
    marginRight: "0px"
  },
  "&[data-enabled=false]": {
    opacity: 0,
    marginRight: "-280px"
  },
  overflow: "scroll"
}));

export const Sidebar = () => {
  const [layersVisible, setLayerVisible] = useState(true);
  const [toolbarVisible, setToolbarVisible] = useState(true);
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled
  }));

  return (
    <SidebarDiv data-enabled={enabled} display="flex" flexDirection="column">
      <SidebarItem
        icon={() => <DynamicIcon iconName="Edit" color="Grey" />} // Replace "CustomizeIconName" with the correct MUI icon name
        title="Customize"
        height={!layersVisible ? "full" : "55%"}
        visible={toolbarVisible}
        onChange={(val) => setToolbarVisible(val)}
      >
        <Toolbar />
      </SidebarItem>
      {/* <Divider /> */}

      <SidebarItem
        icon={() => <DynamicIcon iconName="Layers" color="Grey" />} // Replace "LayerIconName" with the correct MUI icon name
        title="Layers"
        height={!toolbarVisible ? "full" : "45%"}
        visible={layersVisible}
        onChange={(val) => setLayerVisible(val)}
      >
        <Box>
          <Layers expandRootOnLoad={true} />
        </Box>
      </SidebarItem>
    </SidebarDiv>
  );
};
