//src/components/selectors/Text/Text2Settings.tsx
import React, { useCallback, useEffect, useState } from "react";
import { useNode } from "@craftjs/core";
import { ToolbarTabs, ToolbarSection, ToolbarItem } from "../../editor";
import { DropResult } from "react-beautiful-dnd";
import { reorder, getItemsFromProps } from "../../../utils/reactRnd";
import ToolbarColorPickerButton from "../../editor/Toolbar/ToolbarColorPickerButton";
import {
  ArrowBack
} from '@mui/icons-material';
import JSONFormResortableConfigurationList from "../../editor/Toolbar/ResortableField/JSONFormResortableFieldList";
import { makeStyles } from "@mui/styles";
import { getPropName } from ".";
import FieldSetting from "src/components/editor/Toolbar/FieldSetting";
import { Box, IconButton, Typography } from "@mui/material";
import { getPropValue } from "src/utils/object";

let index = 1;

const useStyles = makeStyles({
  flexPaper: {
    flex: 1,
    margin: 16,
    minWidth: 350
  }
});

const JSONFormSettings = () => {
  const classes = useStyles();
  const {
    displayName,
    actions: { setProp },
    props
  } = useNode((node) => ({
    props: node.data.props,
    displayName: node.data.displayName
  }));

  useEffect(() => {
    console.log("change", props.order);
  }, [props.order]);

  const [activeTab, setActiveTab] = useState(0);
  const items = React.useMemo(() => {
    return props.order.map((key) => ({
      key,
      ...props[key]
    })) as { key: string; label: string }[];
  }, [props, props.order]);

  const onDragEnd = ({ destination, source }: DropResult) => {
    // dropped outside the list
    if (!destination) return;

    const newItems = reorder(items, source.index, destination.index);

    setProp((prop) => {
      prop.order = newItems.map((it) => it.key);
    });
  };

  const onAddItem = React.useCallback(() => {
    while (Object.keys(props).includes(`custom_key_${index}`)) {
      index++;
    }
    setProp((prop) => {
      prop[`custom_key_${index}`] = {
        label: `Custom Key ${index}`,
        value: "",
        type: "text"
      };
      prop.order = [...prop.order, `custom_key_${index}`];
    });
  }, [setProp, props]);

  const changeLabel = React.useCallback(
    (propName, value) => {
      setProp((prop) => {
        prop[propName] = {
          ...prop[propName],
          label: value
        };
      });
    },
    [setProp]
  );
  const onClickShowHide = React.useCallback(
    (propName) => {
      setProp((prop) => {
        prop[propName] = {
          ...prop[propName],
          hidden: !prop[propName].hidden
        };
      });
    },
    [setProp]
  );

  const onDelete = React.useCallback(
    (propName) => {
      setProp((prop) => {
        prop[propName] = undefined;
        prop.order = [...prop.order].filter((k) => k !== propName);
      });
    },
    [setProp]
  );

  const onClickSetting = React.useCallback(
    (propName) => {
      setProp((prop) => {
        prop.settingField = propName
      });
    },
    [setProp]
  );

  const handleBackField = useCallback(() => {
    const fields = (props.settingField || '').split('.');
    fields.pop();
    setProp((prop) => {
      prop.settingField = fields.length ? fields.join('.') : undefined;
    });
  }, [props.settingField]);

  return (
    <>

      <Box display="flex" alignItems="center" height="30px">
        {props.settingField ? (
          <>
            <IconButton size="small" onClick={handleBackField}>
              <ArrowBack fontSize="small" />
            </IconButton>
            <Typography fontWeight="500">{getPropValue(props, props.settingField).label}</Typography>
          </>
        ) : <Typography fontWeight="500">{displayName}</Typography>}
      </Box>
      {
        props.settingField ? <FieldSetting propKey={props.settingField} type={getPropValue(props, props.settingField).type} /> :
          <ToolbarTabs
            labels={["Content", "Style", "Advanced"]}
            activeTab={activeTab}
            onChange={setActiveTab}
          >
            <ToolbarSection label="Content" title="Data" defaultExpanded>
              <JSONFormResortableConfigurationList
                items={items}
                onDragEnd={onDragEnd}
                onAddItem={onAddItem}
                onChangeLabel={changeLabel}
                onClickShowHide={onClickShowHide}
                onDelete={onDelete}
                onClickSetting={onClickSetting}
              />
            </ToolbarSection>
            <ToolbarSection label="Content" title="Label">
            </ToolbarSection>
            <ToolbarSection label="Content" title="General">
            </ToolbarSection>
            <ToolbarSection label="Style" title="Label styles">
            </ToolbarSection>
            <ToolbarSection label="Style" title="Array Styles">
            </ToolbarSection>
            <ToolbarSection label="Style" title="Item Styles">
            </ToolbarSection>
          </ToolbarTabs>
      }
    </>
  );
};

export default JSONFormSettings;
