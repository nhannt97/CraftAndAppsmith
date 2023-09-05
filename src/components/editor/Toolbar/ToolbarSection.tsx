//src/components/editor/Toolbar/ToolbarSection.tsx
import { useNode } from "@craftjs/core";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
  Divider
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import React from "react";

const PanelStyles = styled(Accordion)({
  background: "transparent",
  boxShadow: "none",
  "&:before": {
    backgroundColor: "#FFF"
  },
  "&.Mui-expanded": {
    margin: "0 0",
    minHeight: "40px",
    "&:before": {
      opacity: "1"
    },
    "& + .MuiAccordion-root:before ": {
      display: "block"
    }
  }
});

const SummaryStyles = styled(AccordionSummary)({
  minHeight: "0px",
  padding: "6px 16px", // Adjusted padding to include padding for chevron
  "& .MuiAccordionSummary-content": {
    margin: "0px"
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)" // Rotate chevron on expansion
  },

  ":hover": {
    backgroundColor: "#f1f5f9"
  }
});

export const ToolbarSection = ({ label, title, defaultExpanded, props, summary, children }: any) => {
  const { nodeProps } = useNode((node) => ({
    nodeProps:
      props &&
      props.reduce((res: any, key: any) => {
        res[key] = node.data.props[key] || null;
        return res;
      }, {})
  }));

  return (
    <PanelStyles defaultExpanded={defaultExpanded}>
      <SummaryStyles
        expandIcon={<ExpandMoreIcon />} // Added expand icon
      >
        <div className="w-full">
          <Grid container direction="row" alignItems="center" spacing={3}>
            <Grid
              item
              xs={12}
              display={"flex"}
              direction={"row"}
              gap={1}
              alignItems={"center"}
              justifyItems={"center"}
              container
            >
              <Typography variant="body2" fontWeight={500}>{title}</Typography>
              {summary && props && (
                <Typography variant="body2" color={"#99a4b3"}>
                  {summary(
                    props.reduce((acc: any, key: any) => {
                      acc[key] = nodeProps[key];
                      return acc;
                    }, {})
                  )}
                </Typography>
              )}
            </Grid>
          </Grid>
        </div>
      </SummaryStyles>
      <AccordionDetails>
        <Grid container spacing={1}>
          {children}
        </Grid>
      </AccordionDetails>
    </PanelStyles>
  );
};
