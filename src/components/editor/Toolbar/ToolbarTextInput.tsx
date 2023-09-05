//src/components/editor/Toolbar/ToolbarTextInput.tsx
import { TextField, InputAdornment, TextFieldProps } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import React, { useEffect, useState, useRef } from "react";
import { ChromePicker } from "react-color";
import InputLabel from "@mui/material/InputLabel";
import InputBase from "@mui/material/InputBase";
import { initializeDropkiqUI } from "../../../utils/dropkiqService";
import Label from "src/components/Label";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#FFFFFF" : "#1A2027",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 16,
    width: "100%",
    maxWidth: "100%",
    //boxSizing: 'border-box',
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow"
    ]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      //boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}));

export type ToolbarTextInputProps = {
  prefix?: string;
  label?: string;
  type: string;
  onChange?: (value: any) => void;
  value?: any;
  fullWidth?: boolean;
  size?: "small" | "medium";
};

export const ToolbarTextInput = ({
  onChange,
  value,
  prefix,
  label,
  type,
  fullWidth,
  ...props
}: ToolbarTextInputProps) => {
  const [internalValue, setInternalValue] = useState(value);
  const [active, setActive] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    let val = value;
    if (type === "color" || type === "bg") {
      val = value ? `rgba(${Object.values(value)})` : "";
    }
    setInternalValue(val);
  }, [value, type]);

  const pickerRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      // Get the actual input element inside the div
      const inputElement = inputRef.current.querySelector("input");

      if (inputElement) {
        //console.log("Input Reference:", inputRef.current); // Log the input reference
        // Define schema, context, and scope according to your requirements
        var schema = {
          contacts: {
            methods: {
              name: {
                type: "ColumnTypes::String",
                foreign_table_name: null,
                hint: "The full name of the contact person"
              },
              email: {
                type: "ColumnTypes::String",
                foreign_table_name: null,
                hint: "The email address of the contact person"
              },
              age: {
                type: "ColumnTypes::Numeric",
                foreign_table_name: null,
                hint: "The computed age of the contact person"
              },
              is_minor: {
                type: "ColumnTypes::Boolean",
                foreign_table_name: null,
                hint: "Is true if the person is less than 18 years old"
              },
              birthdate: {
                type: "ColumnTypes::DateTime",
                foreign_table_name: null,
                hint: "The birthdate of the contact person"
              },
              notes: {
                type: "ColumnTypes::Text",
                foreign_table_name: null,
                hint: "Any notes that are saved in the database"
              },
              favorite_website: {
                type: "ColumnTypes::HasOne",
                foreign_table_name: "websites",
                hint: "The website the person visits most often"
              },
              visited_websites: {
                type: "ColumnTypes::HasMany",
                foreign_table_name: "websites",
                hint: "A list of websites the person has visited"
              }
            }
          },
          websites: {
            methods: {
              nickname: {
                type: "ColumnTypes::String",
                foreign_table_name: null,
                hint: "The nickname of the website"
              },
              url: {
                type: "ColumnTypes::String",
                foreign_table_name: null,
                hint: "The website HTTP URL address"
              }
            }
          }
        };
        var context = {
          email_subject: {
            type: "ColumnTypes::String",
            foreign_table_name: null,
            hint: "The subject of the email to send"
          },
          email_body: {
            type: "ColumnTypes::Text",
            foreign_table_name: null,
            hint: "The body of the email to send"
          },
          email_from: {
            type: "ColumnTypes::String",
            foreign_table_name: null,
            hint: "The email address the email will be sent from"
          },
          email_contact: {
            type: "ColumnTypes::HasOne",
            foreign_table_name: "contacts",
            hint: "The contact who will receive the email"
          }
        };
        // Test data that is used for the preview feature (optional)
        var scope = {
          email_subject: "Try Dropkiq Today!",
          email_body:
            "Work faster with a smarter editor. Write complex Liquid statements with ease. Dropkiq Autocompletion gives your users the confidence they need to write their statements correctly the first time.",
          email_from: "Adam Darrah <adam@dropkiq.com>",
          email_contact: {
            name: "John Doe",
            email: "john.doe@dropkiq.com",
            age: 30,
            is_minor: false,
            birthdate: Date.parse("March 18, 1990"),
            notes:
              "Software developer for application that uses liquid, but users don't fully understand how to use it...",
            favorite_website: {
              nickname: "Dropkiq",
              url: "https://www.dropkiq.com/"
            },
            visited_websites: [
              {
                nickname: "Dropkiq Ruby Gem",
                url: "https://github.com/akdarrah/dropkiq-gem"
              },
              {
                nickname: "Dropkiq UI",
                url: "https://github.com/akdarrah/dropkiq-ui"
              }
            ]
          }
        };
        //const craftJsStructureString =
        //  '{"ROOT":{"type":{"resolvedName":"Container"},"isCanvas":true,"props":{"flexDirection":"column","alignItems":"flex-start","justifyContent":"flex-start","fillSpace":"no","padding":["40","40","40","40"],"margin":["0","0","0","0"],"background":{"r":255,"g":255,"b":255,"a":1},"color":{"r":120,"g":120,"b":120,"a":1},"shadow":3,"radius":0,"width":"800px","height":"auto"},"displayName":"Container","custom":{"displayName":"App"},"hidden":false,"nodes":["aOJrioRzmW"],"linkedNodes":{}},"aOJrioRzmW":{"type":{"resolvedName":"Container"},"isCanvas":true,"props":{"flexDirection":"column","alignItems":"flex-start","justifyContent":"flex-start","fillSpace":"no","padding":["0","0","0","0"],"margin":["0","0","0","0"],"background":{"r":78,"g":78,"b":78,"a":1},"color":{"r":0,"g":0,"b":0,"a":1},"shadow":3,"radius":0,"width":"300px","height":"300px"},"displayName":"Container","custom":{},"parent":"ROOT","hidden":false,"nodes":["y56Aqu2v9v","aW3_OnrCX4","7LyMkVlQOt"],"linkedNodes":{}},"y56Aqu2v9v":{"type":{"resolvedName":"Text"},"isCanvas":false,"props":{"text":"Hi there","fontSize":"12","textAlign":"left","fontWeight":"500","color":{"r":92,"g":90,"b":90,"a":1},"shadow":0,"overflow":"none","visibility":true,"height":"auto","margin":[0,0,0,0]},"displayName":"Text","custom":{},"parent":"aOJrioRzmW","hidden":false,"nodes":[],"linkedNodes":{}},"aW3_OnrCX4":{"type":{"resolvedName":"Button"},"isCanvas":false,"props":{"background":{"r":255,"g":255,"b":255,"a":0.5},"color":{"r":92,"g":90,"b":90,"a":1},"hoverBackground":{"r":235,"g":235,"b":235,"a":0.5},"hoverColor":{"r":72,"g":70,"b":70,"a":1},"borderType":"default","borderColor":{"r":0,"g":0,"b":0,"a":1},"hoverBorderType":"default","hoverBorderColor":{"r":0,"g":0,"b":0,"a":1},"variant":"contained","text":"Button","margin":[5,0,5,0],"padding":[0,0,0,0],"textComponent":{"text":"Text","fontSize":"15","textAlign":"center","fontWeight":"500","color":{"r":92,"g":90,"b":90,"a":1},"shadow":0,"overflow":"none","visibility":true,"height":"auto","margin":[0,0,0,0]},"startIcon":"","endIcon":"","hoverStartIcon":"","hoverEndIcon":"","startIconColor":{"r":0,"g":0,"b":0,"a":1},"endIconColor":{"r":0,"g":0,"b":0,"a":1},"hoverStartIconColor":{"r":0,"g":0,"b":0,"a":1},"hoverEndIconColor":{"r":0,"g":0,"b":0,"a":1}},"displayName":"Button","custom":{},"parent":"aOJrioRzmW","hidden":false,"nodes":[],"linkedNodes":{}},"7LyMkVlQOt":{"type":{"resolvedName":"Container"},"isCanvas":true,"props":{"flexDirection":"column","alignItems":"flex-start","justifyContent":"flex-start","fillSpace":"no","padding":["0","0","0","0"],"margin":["0","0","0","0"],"background":{"r":218,"g":132,"b":132,"a":1},"color":{"r":160,"g":161,"b":159,"a":1},"shadow":3,"radius":0,"width":"300px","height":"200px"},"displayName":"Container","custom":{},"parent":"aOJrioRzmW","hidden":false,"nodes":[],"linkedNodes":{}}}';
        // You can update the schema based on the craft.js structure if needed

        // Parse the JSON string to an object
        //const craftJsStructure = JSON.parse(craftJsStructureString);

        // You can update the schema based on the craft.js structure if needed
        //updateSchemaFromCraftJs(craftJsStructure); // Pass the parsed object

        // Initialize DropkiqUI
        initializeDropkiqUI(inputElement, schema, context, scope, "");
      } else {
        console.warn("Input element not found inside the div.");
      }
    } else {
      console.warn("inputRef.current is not defined."); // Warn if inputRef.current is not defined
    }
  }, [inputRef]);

  useEffect(() => {
    function handleDocumentClick(event) {
      // Check if the click is outside the color picker and its trigger
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setActive(false);
        event.stopPropagation();
      }
    }

    if (active) {
      // Add the listener when the color picker is active
      document.addEventListener("mousedown", handleDocumentClick);
    }

    return () => {
      // Cleanup the listener when the component is unmounted or the color picker is inactive
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [active]);

  return (
    <div
      style={{ width: "100%", position: "relative", boxSizing: "border-box" }}
      onClick={(e) => {
        setActive(true);
        e.stopPropagation(); // Corrected this line
      }}
    >
      {label && (
        <Label>
          {label}
        </Label>
      )}
      {(type === "color" || type === "bg") && active ? (
        <div
          ref={pickerRef}
          className="absolute"
          style={{
            zIndex: 99999,
            top: "calc(100% + 10px)",
            left: "-5%"
          }}
        >
          <ChromePicker
            color={value}
            onChange={(color: any) => {
              onChange(color.rgb);
            }}
          />
        </div>
      ) : null}
      <StyledTextField
        ref={inputRef}
        size={props.size}
        value={internalValue || ""}
        fullWidth={fullWidth}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onChange((e.target as any).value);
            e.stopPropagation();
          }
        }}
        onChange={(e) => {
          setInternalValue(e.target.value);
        }}
        InputProps={{
          disableUnderline: true,
          startAdornment: ["color", "bg"].includes(type) ? (
            <InputAdornment
              position="start"
              sx={{
                position: "absolute",
                marginTop: "2px",
                marginRight: "2px",
                width: "auto"
              }}
            >
              <div
                className="w-2 h-2 inline-block rounded-full relative"
                style={{
                  left: "15px",
                  width: "24px",
                  background: internalValue
                }}
              />
            </InputAdornment>
          ) : null
        }}
        {...props}
      />
    </div>
  );
};
