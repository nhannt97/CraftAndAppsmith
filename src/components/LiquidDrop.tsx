//@ts-nocheck
import React, {
  useMemo,
  useState,
  useCallback,
  useRef,
  useEffect
} from "react";
import { TextField, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import {
// 	makeStyles
// } from '@material-ui/';
//import { getLiquidValues } from '../utils';

import { getStoreLiquidObjects } from "./utils";

const useStyles = makeStyles(() => ({
  input: {
    margin: "10px 0 !important",
    background: "white",
    borderRadius: 3
  },
  invalidWidgetName: {
    position: "absolute",
    right: 3,
    top: "50%",
    transform: "translateY(-50%)"
  },
  list: {
    background: "#e6e6e6",
    width: "calc(100% + 16px) !important",
    padding: "0 8px 15px 8px",
    boxSizing: "border-box",
    marginTop: 10,
    marginLeft: -8,
    "& a": {
      textDecoration: "none !important",
      cursor: "pointer !important"
    }
  },
  typoBtn: {
    cursor: "pointer",
    textDecoration: "underline"
  },
  tooltip: {
    color: "inherit !important",
    background: "white !important",
    boxShadow: "0px 4px 4px rgb(0 0 0 / 30%) !important",
    padding: "10px 15px !important"
  },
  groupLabel: {
    fontWeight: "700 !important",
    color: "black !important"
  },
  option: {
    padding: "6px 16px",
    cursor: "pointer",
    "&:hover": {
      background: "#eee"
    }
  },
  selectedOption: {
    background: "#eee"
  }
}));

const getLiquidString = (e) => {
  console.log("What is e", e);
  console.log("what is e.value", e.target.value);
  const value = e.target.value;
  const selectionStart = e.target.selectionStart;
  let word = "";
  let startIndex = selectionStart;
  if (value !== undefined) {
    while (value[startIndex - 1] !== "" && startIndex > 0) {
      word = value[startIndex - 1] + word;
      startIndex--;
    }
    let startWord = startIndex;
    startIndex = selectionStart;
    while (value[startIndex] !== " " && startIndex < value.length) {
      word += value[startIndex];
      startIndex++;
    }
    return {
      word,
      index: startWord
    };
  }
};

const checkIfLiquidString = (e: { target: { selectionStart: any } }) => {
  const selectionStart = e.target.selectionStart;
  const { word, index } = getLiquidString(e);
  return (
    word.startsWith("{{") && !word.endsWith("}}") && index < selectionStart - 1
  );
};

const LiquidDrop = ({
  openLiquid,
  disabled,
  value,
  label,
  onLiquidChange,
  rows = 1,
  multiline = false,
  placeholder,
  liquidString
}) => {
  const nodes = {
    firstForm: {
      name: "novelcx",
      lastname: "somename"
    },
    secondForm: {
      name: "Sample 2"
    }
  };

  const classes = useStyles();
  const [input, setInput] = useState(value);
  const [liquid, setLiquid] = useState();
  const [open, setOpen] = React.useState(false);
  const [selectionStart, setSelectionStart] = useState();

  useEffect(() => {
    if (value !== input) {
      setInput(value);
      //	onChange(value.trim());
      if (!value.startsWith("{{") && open) {
        setOpen(false);
      }
    }
  }, [value]);

  const defaultValueRef = useRef();
  defaultValueRef.current = value;

  function createKeyArray(obj, prefix = "novelcx", result = []) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const fullKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === "object" && !Array.isArray(value)) {
          createKeyArray(value, fullKey, result);
        } else {
          result.push(fullKey);
        }
      }
    }
    return result;
  }

  const options = useMemo(() => {
    let opts = [];
    opts = getStoreLiquidObjects(nodes);
    return opts;
  }, [nodes]);

  const handleChange = useCallback(
    (e) => {
      const _value = e.target.value;
      if (typeof _value !== "string") return;
      setLiquid(getLiquidString(e).word);
      setSelectionStart(e.target.selectionStart);
      setInput(_value);
      onLiquidChange(_value.trim());
      if (checkIfLiquidString(e)) {
        setOpen(true);
      } else setOpen(false);
    },
    [onLiquidChange]
  );

  const scrollToSelected = useCallback((idx) => {
    document.getElementById("list").scrollTo(0, idx * 31);
  }, []);

  const handleKeypress = useCallback(
    (e) => {
      const optionEls = document.querySelectorAll(`.${classes.option}`);
      if (e.which === 27) setOpen(false);
      let selectedIdx = -1;
      for (let i = 0; i < optionEls.length; i++) {
        if (optionEls[i].className.includes(classes.selectedOption)) {
          selectedIdx = i;
          break;
        }
      }
      if (e.which === 38 && selectedIdx > 0) {
        optionEls[selectedIdx].classList.remove(classes.selectedOption);
        optionEls[selectedIdx - 1].classList.add(classes.selectedOption);
        scrollToSelected(selectedIdx - 1);
      }
      if (e.which === 40) {
        if (selectedIdx === -1 && optionEls[0]) {
          optionEls[0].classList.add(classes.selectedOption);
        } else {
          optionEls[selectedIdx].classList.remove(classes.selectedOption);
          optionEls[selectedIdx + 1].classList.add(classes.selectedOption);
          scrollToSelected(selectedIdx + 1);
        }
      }
      if (e.key === "Enter" && selectedIdx !== -1) {
        const insertValue = optionEls[selectedIdx].dataset.value;
        const { word, index } = getLiquidString({
          target: { value: input, selectionStart }
        });
        //const newInput = input.substring(0, index) + insertValue + input.substring(index + word.length, input.length);
        setInput(insertValue);
        onLiquidChange(insertValue);
        setOpen(false);
      }
    },
    [
      classes.option,
      classes.selectedOption,
      input,
      onLiquidChange,
      scrollToSelected,
      selectionStart
    ]
  );

  const handleKeyup = useCallback((e) => {
    if (e.keyCode === 37 || e.keyCode === 39) {
      setSelectionStart(e.target.selectionStart);
      if (checkIfLiquidString(e)) {
        setLiquid(getLiquidString(e).word);
        setOpen(true);
      } else {
        setLiquid();
        setOpen(false);
      }
    }
  }, []);

  useEffect(() => {
    const optionEls = document.querySelectorAll(`.${classes.option}`);
    if (openLiquid && optionEls.length) {
      window.addEventListener("keydown", handleKeypress);
    }
    return () => {
      window.removeEventListener("keydown", handleKeypress);
    };
  }, [
    classes.option,
    classes.selectedOption,
    handleKeypress,
    handleKeyup,
    openLiquid
  ]);

  const handleMouseDown = useCallback(
    (e) => {
      const eles = e.path;
      const liquid = eles && eles.find((el) => el.id === "liquid-container");
      if (!liquid && openLiquid) setOpen(false);
    },
    [openLiquid]
  );

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    return () => window.removeEventListener("mousedown", handleMouseDown);
  }, [handleMouseDown]);

  const handleClick = useCallback((e) => {
    setSelectionStart(e.target.selectionStart);
    if (checkIfLiquidString(e)) {
      setLiquid(getLiquidString(e).word);
      setOpen(true);
    } else {
      setLiquid();
      setOpen(false);
    }
  }, []);

  const handleMouseDownSelect = useCallback((e) => {
    const optionValue = e.currentTarget.dataset.value;
    if (optionValue) {
      handleSelectOption(optionValue)();
    }
  }, []);

  const handleSelectOption = useCallback(
    (insertValue) => () => {
      console.log("Am I called on the click", insertValue);
      const { word, index } = getLiquidString({
        target: { value: input, selectionStart }
      });
      const newInput =
        input.substring(0, index) +
        insertValue +
        input.substring(index + word.length, input.length);
      console.log("check the values", newInput);
      setInput(insertValue);
      onLiquidChange(insertValue);
      setOpen(false);
    },
    [input, onLiquidChange, selectionStart]
  );
  console.log("Liquid Value options", nodes);
  console.log("Open liquid", openLiquid);
  console.log("Open liquid opts", options);
  return (
    <Box position="relative" id="liquid-container">
      {/* <TextField
				className={classes.input}
				value={input}
				defaultValue={defaultValueRef.current}
				onChange={handleChange}
				fullWidth
				size='small'
				multiline={multiline}
				rows={rows}
				variant="outlined"
				disabled={disabled}
				label={label}
				placeholder={placeholder}
				onKeyUp={handleKeyup}
				onClick={handleClick}
				onKeyDown={(e) => {
					if (open && (e.key === 'Enter' || [27, 38, 40].includes(e.which))) e.preventDefault();
				}}
			/> */}
      <Box
        id="list"
        width="100%"
        maxHeight={300}
        overflow="auto"
        position="absolute"
        left={0}
        top={49}
        boxShadow="rgb(0 0 0 / 20%) 0px 5px 5px -3px, rgb(0 0 0 / 14%) 0px 8px 10px 1px, rgb(0 0 0 / 12%) 0px 3px 14px 2px"
        zIndex={2}
        style={{ background: "white" }}
      >
        {options
          .filter((o) =>
            o.toLocaleLowerCase().includes(liquidString?.toLocaleLowerCase())
          )
          .map((option) => {
            return (
              <Box
                className={classes.option}
                data-value={option}
                key={option}
                onClick={handleSelectOption(option)}
                onMouseDown={handleMouseDownSelect}
              >
                {option}
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};

export default LiquidDrop;
