import React from "react";
import { Tabs, Tab, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  tab: {
    textTransform: 'unset'
  },
  indicator: {
    bottom: 2
  }
}));

type ToolbarTabsProps = {
  labels: string[];
  activeTab: number;
  onChange?: (index: number) => void;
  children?: React.ReactNode[]; // Define children prop to accept an array of React nodes
};

export const ToolbarTabs: React.FC<ToolbarTabsProps> = ({
  labels,
  activeTab,
  onChange,
  children
}) => {
  const classes = useStyles();

  const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  // Filter out null or undefined children and corresponding labels
  const validChildren = children?.filter((child: any) => child.props?.label === labels[activeTab]) || [];

  return (
    <div>
      <Tabs value={activeTab} onChange={handleTabChange} classes={{ indicator: classes.indicator }}>
        {labels.map((label, index) => (
          <Tab key={index} label={label} classes={{ root: classes.tab }} />
        ))}
      </Tabs>

      {/* Render the corresponding child based on the activeTab */}
      {validChildren}
    </div>
  );
};
