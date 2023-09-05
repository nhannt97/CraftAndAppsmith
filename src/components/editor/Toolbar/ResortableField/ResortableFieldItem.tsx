import * as React from "react";
import { Draggable } from "react-beautiful-dnd";

import makeStyles from "@mui/styles/makeStyles";
import {
  ListItem,
  OutlinedInput,
  InputAdornment,
  IconButton
} from "@mui/material";
import {
  DragIndicator,
  VisibilityOutlined as Visibility,
  VisibilityOffOutlined as VisibilityOff,
  SettingsOutlined as Settings,
  DeleteOutline as Delete
} from "@mui/icons-material";

const useStyles = makeStyles({
  draggingListItem: {
    background: "rgb(235,235,235)"
  },
  item: {
    padding: 0
  },
  iconBtn: {
    padding: "5px"
  },
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0
  }
});

export type Item = {
  key: string;
  label: string;
  hidden?: boolean;
  required?: boolean;
  alwayVisible?: boolean;
};

export type ResortableFieldItemProps = {
  item: Item;
  index: number;
  onClickSetting?: (propsName) => void;
  onClickShowHide?: (propsName) => void;
  onChangeLabel: (propName, value) => void;
  onDelete?: (propName) => void;
};

const ResortableFieldItem = ({
  item,
  index,
  onChangeLabel,
  onClickSetting,
  onDelete,
  onClickShowHide
}: ResortableFieldItemProps) => {
  const classes = useStyles();
  const [isDragDisabled, setIsDragDisabled] = React.useState(true);
  const handleOver = React.useCallback(() => {
    setIsDragDisabled(false);
  }, []);
  const handleLeave = React.useCallback(() => {
    setIsDragDisabled(true);
  }, []);

  const handleChangeLabel = React.useCallback(
    (e) => {
      onChangeLabel(item.key, e.target.value);
    },
    [onChangeLabel, item.key]
  );
  const handleClickShow = React.useCallback(
    (e) => {
      onClickShowHide(item.key);
    },
    [onClickShowHide, item.key]
  );
  const handleDelete = React.useCallback(
    (e) => {
      onDelete(item.key);
    },
    [onDelete, item.key]
  );
  const handleClickSetting = React.useCallback(
    (e) => {
      onClickSetting(item.key);
    },
    [onClickSetting, item.key]
  );
  return (
    <Draggable
      isDragDisabled={isDragDisabled}
      draggableId={item.key}
      index={index}
    >
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          classes={{ root: classes.listItem }}
          className={snapshot.isDragging ? classes.draggingListItem : ""}
        >
          <OutlinedInput
            id={item.key}
            fullWidth
            size="small"
            classes={{ root: classes.item }}
            type="text"
            value={item.label}
            onChange={handleChangeLabel}
            startAdornment={
              <InputAdornment position="start">
                <IconButton
                  onMouseOver={handleOver}
                  onMouseLeave={handleLeave}
                  classes={{ root: classes.iconBtn }}
                >
                  <DragIndicator fontSize="small" />
                </IconButton>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton classes={{ root: classes.iconBtn }} onClick={handleClickSetting}>
                  <Settings fontSize="small" />
                </IconButton>
                {item.required && (
                  <IconButton
                    classes={{ root: classes.iconBtn }}
                    onClick={handleClickShow}
                  >
                    {!item.hidden && <Visibility fontSize="small" />}
                    {item.hidden && <VisibilityOff fontSize="small" />}
                  </IconButton>
                )}
                {!item.required && !item.alwayVisible && (
                  <IconButton
                    classes={{ root: classes.iconBtn }}
                    onClick={handleDelete}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                )}
              </InputAdornment>
            }
          />
        </ListItem>
      )}
    </Draggable>
  );
};

export default ResortableFieldItem;
