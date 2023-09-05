import React, { FC, useState } from 'react';
import { ToolbarTabs } from '../ToolbarTabs';
import { ToolbarSection } from '../ToolbarSection';
import { ToolbarItem } from '../ToolbarItem';
import { Box, IconButton, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { dateFormats, fieldTypes, fontSizes } from 'src/components/data';
import { Javascript } from '@mui/icons-material';

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

const DateFieldSetting: FC<any> = ({ propKey }) => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);

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
        />
        <Box mt={2} width="100%" position="relative">
          <IconButton classes={{ root: classes.js }} size="small">
            <Javascript fontSize='small' />
          </IconButton>
          <ToolbarItem
            type="select"
            full
            propKey={propKey + '.type'}
            label="Date format"
            size="small"
          >
            {dateFormats.map((type) => (
              <MenuItem value={type.value}>{type.label}<br />{type.value}</MenuItem>
            ))}
          </ToolbarItem>
        </Box>
        <Box mt={2} width="100%" position="relative">
          <IconButton classes={{ root: classes.js }} size="small">
            <Javascript fontSize='small' />
          </IconButton>
          <ToolbarItem
            type="text"
            full
            propKey={propKey}
            label="Default value"
            size="small"
          />
        </Box>
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
      <ToolbarSection label="Content" title="Validation" defaultExpanded>
        <ToolbarItem
          type="text"
          full
          propKey={propKey + '.minDate'}
          label="Min Date"
          size="small"
        />
        <Box mt={2} width="100%" />
        <ToolbarItem
          type="text"
          full
          propKey={propKey + '.maxDate'}
          label="Max Date"
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
      <ToolbarSection label="Content" title="Events" defaultExpanded>
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
      <ToolbarSection label="Style" title="Icon" defaultExpanded>
      </ToolbarSection>
      <ToolbarSection label="Style" title="Color" defaultExpanded>
        <Box width="100%" position="relative">
          <IconButton classes={{ root: classes.js }} size="small">
            <Javascript fontSize='small' />
          </IconButton>
          <ToolbarItem
            type="color"
            full
            propKey={propKey + '.accentColor'}
            label="Accent color"
            size="small"
          />
        </Box>
      </ToolbarSection>
      <ToolbarSection label="Style" title="Border and shadow" defaultExpanded>
      </ToolbarSection>
    </ToolbarTabs>
  );
};

export default DateFieldSetting;
