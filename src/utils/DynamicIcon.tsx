// src/utils/DynamicIcon.tsx

import React from "react";
import * as Icons from "@mui/icons-material";

const DynamicIcon = ({ iconName, color, iconSize = 18, ...props }) => {
  const IconComponent = Icons[iconName];

  if (!IconComponent) {
    return null; // or return a default icon if the iconName doesn't match any known icons
  }

  return <IconComponent style={{ color, fontSize: iconSize }} {...props} />;
};

export default DynamicIcon;

const iconNames = Object.keys(Icons);

export { DynamicIcon, iconNames };
