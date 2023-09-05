// components/user/TextInput.tsx
import React, { useCallback, useState } from "react";
import { UserComponent, useNode } from "@craftjs/core";
import { checkIfLiquidString, getLiquidString, renderLiquidTemplate,checkIfInputIsLiquidString } from "../utils";
import LiquidDrop from "../LiquidDrop";
import { liquidObjs } from "../data";
import { FormControl, FormLabel, TextField } from "@material-ui/core";

interface TextInputProps {   
  liquidValue?: string;
  placeholder?: string; 
}

export const ContainerSettings = () => {
  const {
    liquidValue,
    placeholder,
    actions: { setProp }
  } = useNode((node) => ({
    liquidValue: node.data.props.liquidValue,
    placeholder: node.data.props.placeholder,
  }));

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");  
  const [liquid, setLiquid] = useState();

  //@ts-ignore
  const handleChange = useCallback((e) => {
    const _value = e.target.value;
    if (typeof _value !== 'string') return;
    //@ts-ignore
    setLiquid(getLiquidString(e).word);   
    //setValue(_value);
    //setProp((props: any) => (props.liquidValue = e.target.value)) 
    console.log("Value coming in",_value);
    if (checkIfLiquidString(e)) {
      setOpen(true);
    } else setOpen(false);

  }, []);

  const handleInputLiquidChange  = useCallback(async (value: string, prop: any) => {
    console.log("in here", value);
    setProp((props: any) => (props.liquidValue = value))
    setOpen(false);   
}, []); 
  console.log("Props value", liquidValue);
  return (
    <div>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Liquid Value</FormLabel>
        <TextField
          defaultValue={liquidValue}
          onChange={(e) => handleChange(e)}   
          // onChange={(e) =>
          //   setProp((props: any) => (props.liquidValue = e.target.value))
          // }
        />
        {
        open &&        
        <LiquidDrop
          disabled={false}
          value={value || ''}   
          label="Trial"
          //@ts-ignore
          //onChange={(e) => handleChange(e)}
          onLiquidChange={(value:any) => handleInputLiquidChange(value, 'trial')} 
          placeholder={'some value'}          
          openLiquid={open}
          liquidString={liquid}
        />
      }
      </FormControl>
    </div>
  );
};


export const TextInput: UserComponent<TextInputProps> = ({ placeholder, liquidValue }) => {
  const {
    connectors: { connect, drag },
    actions: { setProp }
  } = useNode();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");  
  const [liquid, setLiquid] = useState();
  //@ts-ignore
  const handleChange = useCallback((e) => {
    const _value = e.target.value;
    if (typeof _value !== 'string') return;
    //@ts-ignore
    setLiquid(getLiquidString(e).word);   
    setValue(_value);
    console.log("Value coming in",_value);
    if (checkIfLiquidString(e)) {
      setOpen(true);
    } else setOpen(false);

  }, []);

  const handleInputLiquidChange  = useCallback(async (value: string, prop: any) => {
    console.log("in here", value);
    setValue(value)
    setOpen(false);
    if (checkIfInputIsLiquidString(value.toString())) {
      const updatedValue = await renderLiquidTemplate(value, { novelcx: {...liquidObjs}});
      setValue(updatedValue);
    }
}, []);  

  return (
    <>
      <input
        ref={(ref) => ref && connect(drag(ref))}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}       
        style={{ padding: "5px", border: "1px solid #ccc", borderRadius: "4px" }}
      />
      {
        open &&        
        <LiquidDrop
          disabled={false}
          value={value || ''}   
          label="Trial"
          //@ts-ignore
          //onChange={(e) => handleChange(e)}
          onLiquidChange={(value:any) => handleInputLiquidChange(value, 'trial')} 
          placeholder={'some value'}          
          openLiquid={open}
          liquidString={liquid}
        />
      }
    </>

  );
};

TextInput.defaultProps = {
  placeholder: "Enter text"
};
TextInput.craft = {
  related: {
    settings: ContainerSettings
  },
  props: {
    liquidValue: "{{}}",
    placeholder: "Enter text"
  }
};
