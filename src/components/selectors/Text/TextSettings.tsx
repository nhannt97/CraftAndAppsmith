//src/components/selectors/Text/Text2Settings.tsx
import React, { useState } from "react";
import { useNode } from "@craftjs/core";
import { ToolbarTabs, ToolbarSection, ToolbarItem } from "../../editor";
import { ToolbarRadio } from "../../editor/Toolbar/ToolbarRadio";
import ToolbarColorPickerButton from "../../editor/Toolbar/ToolbarColorPickerButton";

export const TextSettings = () => {
  const {
    actions: { setProp },
    props
  } = useNode((node) => ({
    props: node.data.props
  }));

  const [activeTab, setActiveTab] = useState(0);

  return (
    <ToolbarTabs
      labels={["Content", "Style", "Advanced"]}
      activeTab={activeTab}
      onChange={setActiveTab}
    >
      <div>
        <ToolbarSection title="Content Settings">
          <ToolbarItem
            full={true}
            propKey="text"
            type="text"
            label="Text Content"
          />
          <ToolbarItem
            propKey="overflow"
            type="radio"
            label="Overflow Handling"
          >
            <ToolbarRadio value="scroll" label="Scroll" />
            <ToolbarRadio value="truncate" label="Truncate" />
            <ToolbarRadio value="none" label="None" />
          </ToolbarItem>
          <ToolbarItem propKey="visibility" type="toggle" label="Visibility" />
          {/* You can add height settings here */}
        </ToolbarSection>
      </div>
      <div>
        <ToolbarSection
          title="Typography"
          props={["fontSize", "fontWeight", "textAlign"]}
        >
          <ToolbarItem
            full={true}
            propKey="fontSize"
            type="slider"
            label="Font Size"
          />
          {/* You can add other typography settings here */}
        </ToolbarSection>
        <ToolbarSection title="Appearance" props={["color"]}>
          <ToolbarColorPickerButton
            label="Font Color"
            color={props.color}
            onChange={(color) => setProp((props) => (props.color = color))}
          />
          {/* You can add other appearance settings here */}
        </ToolbarSection>
      </div>
      {null} {/* ADVANCED Tab - will not be rendered */}
    </ToolbarTabs>
  );
};
