import React, { FC, useCallback, useState } from 'react';
import { ToolbarTabs } from '../ToolbarTabs';
import { ToolbarSection } from '../ToolbarSection';
import { ToolbarItem } from '../ToolbarItem';
import { useNode } from '@craftjs/core';
import { Box, IconButton, MenuItem } from '@mui/material';
import { fieldTypes, fontSizes } from 'src/components/data';
import ResortableFieldItem from '../ResortableField/ResortableFieldItem';
import { getPropValue } from 'src/utils/object';
import ResortableArrayFieldSetting from '../ResortableField/ResortableArrayFieldSetting';
import { Javascript } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  js: {
    position: 'absolute',
    top: 2,
    left: '100px',
    padding: 0,
    zIndex: 1,
    background: 'rgba(0, 0, 0, 0.04)'
  }
}));

const ArrayFieldSetting: FC<any> = ({
  propKey
}) => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const {
    actions: { setProp },
    propValue
  } = useNode((node) => ({
    propValue: getPropValue(node.data.props, propKey).value
  }));

  const onChangeLabel = useCallback((propName, value) => {
    setProp((prop) => {
      prop[propKey].forEach((_, id) => {
        prop[propKey][id].label = value;
      })
    });
  }, []);
  const onClickSetting = useCallback((propName) => {
    setProp((prop) => {
      prop.settingField = propName;
    });
  }, []);

  const handleChangeKey = useCallback((value) => {
    setProp((prop) => {
      const fields = prop.settingField.plit('.');
      const field = fields.pop();
      fields.push(value);
      prop.settingField = fields.join('.');
      prop[value] = prop[propKey];
      delete prop[propKey];
    });
  }, []);

  return (
    <ToolbarTabs
      labels={["Content", "Style"]}
      activeTab={activeTab}
      onChange={setActiveTab}
    >
      <ToolbarSection label="Content" title="Data" defaultExpanded>
        <ToolbarItem
          type="select"
          full
          propKey={propKey + '.type'}
          label="Field Type"
          size="small"
        >
          {fieldTypes.map((type) => (
            <MenuItem value={type.value}>{type.label}</MenuItem>
          ))}
        </ToolbarItem>
        <Box mt={2} width="100%" />
        <ToolbarItem
          type="text"
          full
          propKey={propKey}
          label="Property name"
          size="small"
          onChange={handleChangeKey}
        />
        <Box mt={2} width="100%" />
        <ToolbarItem
          type="text"
          full
          propKey={propKey}
          label="Default value"
          size="small"
        />
        <Box mt={2} width="100%" />
        <ResortableArrayFieldSetting
          item={{
            key: propKey + '.value[0]',
            label: propValue[0].label,
            alwayVisible: true
          }}
          onChangeLabel={onChangeLabel}
          onClickSetting={onClickSetting}
        />
      </ToolbarSection>
      <ToolbarSection label="Content" title="Label" defaultExpanded>
        <ToolbarItem
          type="text"
          full
          propKey={propKey + '.label'}
          label="Text"
          size="small"
        />
      </ToolbarSection>
      <ToolbarSection label="Content" title="General" defaultExpanded>
        <ToolbarItem
          type="text"
          full
          propKey={propKey + '.tooltip'}
          label="Tooltip"
          size="small"
        />
      </ToolbarSection>
      <ToolbarSection label="Style" title="Label styles" defaultExpanded>
        <Box width="100%" position="relative">
          <IconButton classes={{ root: classes.js }} size="small">
            <Javascript fontSize='small' />
          </IconButton>
          <ToolbarItem
            type="bg"
            full
            propKey={propKey + '.fontColor'}
            label="Font color"
            size="small"
          />
        </Box>
        <Box mt={2} width="100%" position="relative">
          <IconButton classes={{ root: classes.js }} size="small">
            <Javascript fontSize='small' />
          </IconButton>
          <ToolbarItem
            type="select"
            full
            propKey={propKey + '.type'}
            label="Field Type"
            size="small"
          >
            {fontSizes.map((type) => (
              <MenuItem value={type.value} style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                <span>{type.label}</span>
                <span>{type.value}</span>
              </MenuItem>
            ))}
          </ToolbarItem>
        </Box>
      </ToolbarSection>
      <ToolbarSection label="Style" title="Array Styles" defaultExpanded>
      </ToolbarSection>
      <ToolbarSection label="Style" title="Item Styles" defaultExpanded>
      </ToolbarSection>
    </ToolbarTabs>
  );
};

export default ArrayFieldSetting;
