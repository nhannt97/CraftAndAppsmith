//src/Components/editor/Viewport/Toolbox.tsx
import { Element, useEditor } from "@craftjs/core";
import { Tooltip, Box, IconButton, IconButtonProps } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";

import ButtonIcon from "@mui/icons-material/SmartButton";
import SquareIcon from "@mui/icons-material/CropDin";
import TypeIcon from "@mui/icons-material/TextFields";
import YoutubeIcon from "@mui/icons-material/YouTube";
import Input from "@mui/icons-material/Crop169";
import IconB from "@mui/icons-material/AddCircle";

import { Button } from "src/components/selectors/Button";
import { IconButton1 } from "src/components/selectors/IconButton1";
import { Container } from "src/components/selectors/Container";
import Text from "src/components/selectors/Text";
import { Video } from "src/components/selectors/Video";
import { TextInput } from "src/components/selectors/BaseElements/Input/TextField";
import { JSONForm } from "src/components/selectors/JSONForm";

interface ExtendedIconButtonProps extends IconButtonProps {
  move?: boolean;
}

const ToolboxDiv = styled(Box)(({ theme }) => ({
  transition: "0.4s cubic-bezier(0.19, 1, 0.22, 1)",
  "&[data-enabled=true]": {
    // styles for when the toolbox should be visible
  },
  "&[data-enabled=false]": {
    width: 0,
    opacity: 0
  },
  display: "flex",
  flexDirection: "column",
  backgroundColor: "FFF",
  top: "0px",
  left: "0px",
  borderRight: "1px solid #cdd5df"
}));

const Item = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "move"
})<ExtendedIconButtonProps>(({ theme, move }) => ({
  "& svg": {
    width: "22px",
    height: "22px",
    fill: "#707070"
  },
  ...(move && {
    cursor: "move"
  })
}));

export const Toolbox = () => {
  const {
    enabled,
    connectors: { create }
  } = useEditor((state) => ({
    enabled: state.options.enabled
  }));

  // Add state for the TextInput value
  const [textValue, setTextValue] = React.useState("");

  return (
    <ToolboxDiv data-enabled={enabled}>
      <Box display="flex" flexDirection="column" alignItems="center" pt={3}>
        <div
          ref={(ref) =>
            create(
              ref,
              <Element
                canvas
                is={Container}
                background={{ r: 228, g: 228, b: 228, a: 0.2 }}
                padding={["20", "20", "20", "20"]}
              ></Element>
            )
          }
        >
          <Tooltip title="Container" placement="right">
            <Item move>
              <SquareIcon />
            </Item>
          </Tooltip>
        </div>
        <div
          ref={(ref) =>
            create(
              ref,
              <Text fontSize="12" textAlign="left" text="Some Text" fontWeight={""} color={undefined} shadow={0} overflow={"none"} visibility={false} height={""} margin={[0,0,0,0]} width={""} />
            )
          }
        >
          <Tooltip title="Text" placement="right">
            <Item move>
              <TypeIcon />
            </Item>
          </Tooltip>
        </div>
        <div
          ref={(ref) =>
            create(
              ref,
              <Button
                size={"small"}
                background={{ r: 10, g: 18, b: 93, a: 1 }}
                color={{ r: 255, g: 255, b: 255, a: 1 }}
                padding={[20, 20, 20, 20]}
                margin={[0, 0, 0, 0]}
                hoverBackground={{ r: 14, g: 26, b: 145, a: 1 }}
                hoverColor={{ r: 255, g: 255, b: 255, a: 1 }}
                startIconColor={{ r: 255, g: 255, b: 255, a: 1 }}
                endIconColor={{ r: 255, g: 255, b: 255, a: 1 }}
                hoverStartIconColor={{ r: 255, g: 255, b: 255, a: 1 }}
                hoverEndIconColor={{ r: 255, g: 255, b: 255, a: 1 }} textComponent={{
                  textAlign: "center"
                }}              />
            )
          }
        >
          <Tooltip title="Button" placement="right">
            <Item move>
              <ButtonIcon />
            </Item>
          </Tooltip>
        </div>
        <div
          ref={(ref) =>
            create(
              ref,
              <IconButton1 padding={[20, 20, 20, 20]} margin={[0, 0, 0, 0]} />
            )
          }
        >
          <Tooltip title="Button" placement="right">
            <Item move>
              <IconB />
            </Item>
          </Tooltip>
        </div>
        <div ref={(ref) => create(ref, <Video />)}>
          <Tooltip title="Video" placement="right">
            <Item move>
              <YoutubeIcon />
            </Item>
          </Tooltip>
        </div>
        <div
          ref={(ref) =>
            create(
              ref,
              <TextInput
                value={textValue} // Provide value
                onChange={(e) => setTextValue(e.target.value)} // Provide onChange handler
              />
            )
          }
        >
          <Tooltip title="Text Input" placement="right">
            <Item move>
              <Input />
            </Item>
          </Tooltip>
        </div>
        <div ref={(ref) => create(ref, <JSONForm />)}>
          <Tooltip title="JSON Form" placement="right">
            <Item move>
              <img src="https://appcdn.appsmith.com/static/media/icon.46adf7030d667f0ad9002aa31f997573.svg" />
            </Item>
          </Tooltip>
        </div>
      </Box>
    </ToolboxDiv>
  );
};
