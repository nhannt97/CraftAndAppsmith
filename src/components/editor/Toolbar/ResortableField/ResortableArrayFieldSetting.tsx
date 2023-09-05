import * as React from "react";
import ResortableFieldItem, { Item } from "./ResortableFieldItem";
import {
  DragDropContext,
  Droppable,
} from "react-beautiful-dnd";
import { Box, Typography } from "@mui/material";
import Label from "src/components/Label";

export type DraggableListProps = {
  item: Item;
  onChangeLabel: (propName, value) => void;
  onClickSetting: (propsName) => void;
};

const ResortableArrayFieldSetting = React.memo(
  ({
    item,
    onChangeLabel,
    onClickSetting
  }: DraggableListProps) => {
    return (
      <Box width="100%">
        <Label>Field Configuration</Label>
        <DragDropContext onDragEnd={() => { }}>
          <Droppable droppableId="droppable-list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <ResortableFieldItem
                  item={item}
                  index={0}
                  onChangeLabel={onChangeLabel}
                  onClickSetting={onClickSetting}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    );
  }
);

export default ResortableArrayFieldSetting;
