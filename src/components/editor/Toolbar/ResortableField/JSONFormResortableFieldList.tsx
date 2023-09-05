import * as React from "react";
import DraggableListItem, { Item } from "./ResortableFieldItem";
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder
} from "react-beautiful-dnd";
import { Add } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Label from "src/components/Label";

export type DraggableListProps = {
  items: Item[];
  onAddItem: () => void;
  onDragEnd: OnDragEndResponder;
  onChangeLabel: (propName, value) => void;
  onClickShowHide: (propName) => void;
  onDelete: (propName) => void;
  onClickSetting: (propsName) => void;
};

const JSONFormResortableFieldList = React.memo(
  ({
    items,
    onDragEnd,
    onChangeLabel,
    onAddItem,
    onClickShowHide,
    onDelete,
    onClickSetting
  }: DraggableListProps) => {
    return (
      <Box>
        <Label>Field Configuration</Label>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable-list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {items.map((item, index) => (
                  <DraggableListItem
                    item={item}
                    index={index}
                    key={item.key}
                    onChangeLabel={onChangeLabel}
                    onClickShowHide={onClickShowHide}
                    onDelete={onDelete}
                    onClickSetting={onClickSetting}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Box display="flex" justifyContent="end">
          <Typography
            style={{ cursor: "pointer", display: "flex" }}
            onClick={onAddItem}
          >
            <Add /> Add new field
          </Typography>
        </Box>
      </Box>
    );
  }
);

export default JSONFormResortableFieldList;
