//src/components/selectors/Button/ButtonSettings.tsx
import React, { useState } from "react";
import { ToolbarSection, ToolbarItem } from "../../editor/Toolbar";
import { ToolbarRadio } from "../../editor/Toolbar/ToolbarRadio";
import { ToolbarTabs } from "../../editor/Toolbar/";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNode } from "@craftjs/core";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Input from "@mui/material/Input";
import ToolbarColorPickerButton from "../../editor/Toolbar/ToolbarColorPickerButton";

export const ButtonSettings = () => {
  const {
    actions: { setProp },
    props
  } = useNode((node) => ({
    props: node.data.props
  }));

  const [mainTab, setMainTab] = useState(0); // Set Style tab as active
  const [colorTab, setColorTab] = useState(0);
  const [iconTab, setIconTab] = useState(0); // Set Style tab as active
  return (
    <React.Fragment>
      <ToolbarTabs
        labels={["Content", "Style", "Advanced"]}
        activeTab={mainTab}
        onChange={setMainTab}
      >
        <div>{/* Content for "Content" tab */}</div>
        <div>
          {mainTab === 1 && (
            <React.Fragment>
              <ToolbarSection title="Colors">
                <ToolbarTabs
                  labels={["Normal", "Hover"]}
                  onChange={setColorTab}
                  activeTab={colorTab}
                >
                  <div>
                    {colorTab === 0 && (
                      <React.Fragment>
                        <Box>
                          <ToolbarColorPickerButton
                            label="Background"
                            color={props.background}
                            onChange={(color) =>
                              setProp((props) => (props.background = color))
                            }
                          />
                        </Box>
                        <Box>
                          <ToolbarColorPickerButton
                            label="Text"
                            color={props.color}
                            onChange={(color) =>
                              setProp((props) => (props.color = color))
                            }
                          />
                        </Box>
                        <Box>
                          <label>Border: </label>
                          <FormControl variant="outlined" fullWidth>
                            <Select
                              value={props.borderType || "default"}
                              onChange={(e) =>
                                setProp(
                                  (props) => (props.borderType = e.target.value)
                                )
                              }
                            >
                              <MenuItem value="default">Default</MenuItem>
                              <MenuItem value="none">None</MenuItem>
                              <MenuItem value="solid">Solid</MenuItem>
                              <MenuItem value="double">Double</MenuItem>
                              <MenuItem value="dotted">Dotted</MenuItem>
                              <MenuItem value="dashed">Dashed</MenuItem>
                              <MenuItem value="groove">Groove</MenuItem>
                            </Select>
                          </FormControl>
                          {props.borderType &&
                            props.borderType !== "default" && (
                              <ToolbarColorPickerButton
                                label="Border Color"
                                color={props.borderColor}
                                onChange={(color) =>
                                  setProp(
                                    (props) => (props.borderColor = color)
                                  )
                                }
                              />
                            )}
                        </Box>
                      </React.Fragment>
                    )}
                  </div>
                  {/* Add similar code block for Hover tab */}
                  <div>
                    {colorTab === 1 && (
                      <React.Fragment>
                        <Box>
                          <label>Hover Background</label>
                          <ToolbarColorPickerButton
                            label="Background"
                            color={props.hoverBackground}
                            onChange={(color) =>
                              setProp(
                                (props) => (props.hoverBackground = color)
                              )
                            }
                          />
                        </Box>
                        <Box>
                          <label>Hover Text</label>
                          <ToolbarColorPickerButton
                            label="Text" // Corrected label
                            color={props.hoverColor}
                            onChange={(color) =>
                              setProp((props) => (props.hoverColor = color))
                            }
                          />
                        </Box>
                        <Box>
                          <label>Hover Border: </label>
                          <FormControl variant="outlined" fullWidth>
                            <Select
                              value={props.hoverBorderType || "default"} // Updated to hoverBorderType
                              onChange={
                                (e) =>
                                  setProp(
                                    (props) =>
                                      (props.hoverBorderType = e.target.value)
                                  ) // Updated to hoverBorderType
                              }
                            >
                              <MenuItem value="default">Default</MenuItem>
                              <MenuItem value="none">None</MenuItem>
                              <MenuItem value="solid">Solid</MenuItem>
                              <MenuItem value="double">Double</MenuItem>
                              <MenuItem value="dotted">Dotted</MenuItem>
                              <MenuItem value="dashed">Dashed</MenuItem>
                              <MenuItem value="groove">Groove</MenuItem>
                            </Select>
                          </FormControl>
                          {props.hoverBorderType &&
                            props.hoverBorderType !== "default" && (
                              <ToolbarColorPickerButton
                                label="Hover Border Color" // Updated label
                                color={props.hoverBorderColor} // Updated to hoverBorderColor
                                onChange={
                                  (color) =>
                                    setProp(
                                      (props) =>
                                        (props.hoverBorderColor = color)
                                    ) // Updated to hoverBorderColor
                                }
                              />
                            )}
                        </Box>
                      </React.Fragment>
                    )}
                  </div>
                </ToolbarTabs>
              </ToolbarSection>
              {/* ... rest of the code ... */}
              <ToolbarSection title="General Settings">
                <FormControl variant="outlined" fullWidth>
                  <Select
                    value={props.variant}
                    onChange={(e) =>
                      setProp((props) => (props.variant = e.target.value))
                    }
                  >
                    <MenuItem value="text">Text</MenuItem>
                    <MenuItem value="outlined">Outlined</MenuItem>
                    <MenuItem value="contained">Contained</MenuItem>
                  </Select>
                </FormControl>

                <FormControl variant="outlined" fullWidth>
                  <Select
                    value={props.size || "small"} // default to medium if undefined
                    onChange={(e) =>
                      setProp((props) => (props.size = e.target.value))
                    }
                  >
                    <MenuItem value="small">Small</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="large">Large</MenuItem>
                  </Select>
                </FormControl>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.fullWidth || false}
                      onChange={(e) =>
                        setProp((props) => (props.fullWidth = e.target.checked))
                      }
                    />
                  }
                  label="Full Width"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.disabled || false}
                      onChange={(e) =>
                        setProp((props) => (props.disabled = e.target.checked))
                      }
                    />
                  }
                  label="Disabled"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.disableElevation || false}
                      onChange={(e) =>
                        setProp(
                          (props) => (props.disableElevation = e.target.checked)
                        )
                      }
                    />
                  }
                  label="Disable Elevation"
                />

                <FormControl fullWidth>
                  <Input
                    value={props.href || ""}
                    onChange={(e) =>
                      setProp((props) => (props.href = e.target.value))
                    }
                    placeholder="URL (href)"
                  />
                </FormControl>
              </ToolbarSection>

              <ToolbarSection title="Styling Settings">
                <FormControl variant="outlined" fullWidth>
                  <Select
                    value={props.color || "primary"} // default to primary if undefined
                    onChange={(e) =>
                      setProp((props) => (props.color = e.target.value))
                    }
                  >
                    <MenuItem value="primary">Primary</MenuItem>
                    <MenuItem value="secondary">Secondary</MenuItem>
                    <MenuItem value="success">Success</MenuItem>
                    <MenuItem value="error">Error</MenuItem>
                    <MenuItem value="info">Info</MenuItem>
                    <MenuItem value="warning">Warning</MenuItem>
                  </Select>
                </FormControl>
              </ToolbarSection>

              <ToolbarSection title="Icon Settings">
                <ToolbarTabs
                  labels={["Normal", "Hover"]}
                  onChange={setIconTab}
                  activeTab={iconTab}
                >
                  <div>
                    {iconTab === 0 && (
                      <React.Fragment>
                        <Box>
                          <label>Start Icon: </label>
                          <FormControl variant="outlined" fullWidth>
                            <Select
                              value={props.startIcon || ""}
                              onChange={(e) =>
                                setProp(
                                  (props) => (props.startIcon = e.target.value)
                                )
                              }
                            >
                              <MenuItem value="None">None</MenuItem>
                              <MenuItem value="Home">Home</MenuItem>
                              <MenuItem value="AccessAlarm">
                                Access Alarm
                              </MenuItem>
                              <MenuItem value="AccountCircle">
                                Account Circle
                              </MenuItem>
                            </Select>
                          </FormControl>
                          <ToolbarColorPickerButton
                            label="Start Icon Color"
                            color={props.startIconColor}
                            onChange={(color) =>
                              setProp((props) => (props.startIconColor = color))
                            }
                          />
                        </Box>
                        <Box>
                          <label>End Icon: </label>
                          <FormControl variant="outlined" fullWidth>
                            <Select
                              value={props.endIcon || ""}
                              onChange={(e) =>
                                setProp(
                                  (props) => (props.endIcon = e.target.value)
                                )
                              }
                            >
                              <MenuItem value="None">None</MenuItem>
                              <MenuItem value="AccessAlarm">
                                Access Alarm
                              </MenuItem>
                              <MenuItem value="AccountCircle">
                                Account Circle
                              </MenuItem>
                            </Select>
                          </FormControl>
                          <ToolbarColorPickerButton
                            label="End Icon Color"
                            color={props.endIconColor}
                            onChange={(color) =>
                              setProp((props) => (props.endIconColor = color))
                            }
                          />
                        </Box>
                      </React.Fragment>
                    )}
                  </div>
                  <div>
                    {iconTab === 1 && (
                      <React.Fragment>
                        <Box>
                          <label>Hover Start Icon: </label>
                          <FormControl variant="outlined" fullWidth>
                            <Select
                              value={props.hoverStartIcon || ""}
                              onChange={(e) =>
                                setProp(
                                  (props) =>
                                    (props.hoverStartIcon = e.target.value)
                                )
                              }
                            >
                              <MenuItem value="None">None</MenuItem>
                              <MenuItem value="AccessAlarm">
                                Access Alarm
                              </MenuItem>
                              <MenuItem value="AccountCircle">
                                Account Circle
                              </MenuItem>
                            </Select>
                          </FormControl>
                          <ToolbarColorPickerButton
                            label="Hover Start Icon Color"
                            color={props.hoverStartIconColor}
                            onChange={(color) =>
                              setProp(
                                (props) => (props.hoverStartIconColor = color)
                              )
                            }
                          />
                        </Box>
                        <Box>
                          <label>Hover End Icon: </label>
                          <FormControl variant="outlined" fullWidth>
                            <Select
                              value={props.hoverEndIcon || ""}
                              onChange={(e) =>
                                setProp(
                                  (props) =>
                                    (props.hoverEndIcon = e.target.value)
                                )
                              }
                            >
                              <MenuItem value="None">None</MenuItem>
                              <MenuItem value="AccessAlarm">
                                Access Alarm
                              </MenuItem>
                              <MenuItem value="AccountCircle">
                                Account Circle
                              </MenuItem>
                            </Select>
                          </FormControl>
                          <ToolbarColorPickerButton
                            label="Hover End Icon Color"
                            color={props.hoverEndIconColor}
                            onChange={(color) =>
                              setProp(
                                (props) => (props.hoverEndIconColor = color)
                              )
                            }
                          />
                        </Box>
                      </React.Fragment>
                    )}
                  </div>
                </ToolbarTabs>
              </ToolbarSection>
            </React.Fragment>
          )}
        </div>
      </ToolbarTabs>
    </React.Fragment>
  );
};
