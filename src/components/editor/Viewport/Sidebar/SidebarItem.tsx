//src/Components/editor/Viewport/Sidebar/SidebarItem.tsx
import React from "react";
import {
  Box,
  Typography,
  IconButton,
  SvgIcon,
  Accordion,
  AccordionSummary,
  AccordionSummaryProps,
  AccordionProps
} from "@mui/material";
import { styled } from "@mui/material/styles";

import MuiAccordionDetails from "@mui/material/AccordionDetails";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type SidebarItemProps = {
  title: string;
  height?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  visible?: boolean;
  onChange?: (bool: boolean) => void;
  children?: React.ReactNode;
};
/*
const SidebarItemDiv = styled(Box, {
  shouldForwardProp: (prop) => prop !== "visible"
})<{ visible?: boolean; height?: string }>`
  height: ${(props) =>
    props.visible && props.height && props.height !== "full"
      ? `${props.height}`
      : "auto"};
  flex: ${(props) =>
    props.visible && props.height && props.height === "full" ? `1` : "unset"};
  color: #545454;
`;
*/
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0),
  borderTop: "1px solid rgba(0, 100, 0, .125)",
  disableGutters: true
}));

export const SidebarItem: React.FC<SidebarItemProps> = ({
  visible,
  icon: Icon,
  title,
  children,
  onChange
}) => {
  return (
    <Box flexGrow={0} display="block" alignItems="top">
      <Accordion
        expanded={visible}
        onChange={() => onChange && onChange(!visible)}
        disableGutters
        elevation={0}
      >
        <AccordionSummary expandIcon={<ArrowForwardIosIcon />}>
          <Box flexGrow={1} display="flex" alignItems="center">
            <SvgIcon component={Icon} className="w-4 h-4 mr-2" />
            <Typography
              variant="body2"
              component="h6"
              textTransform="uppercase"
            >
              {title}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box width="100%" flexGrow={1}>
            <Typography variant="body2" component="h6">
              {children}
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
