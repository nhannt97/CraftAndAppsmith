//@ts-nochecks
import { Liquid } from "liquidjs";

export const renderLiquidTemplate = async (
  string: string,
  variableObject: Object
) => {
  const engine = new Liquid();
  const tpl = engine.parse(string);
  return await engine.render(tpl, variableObject);
};

export const getStoreLiquidObjects = (liquidData: any) => {
  //To move to utils
  //@ts-ignore
  let arr = [];
  let cc = liquidData;
  //@ts-ignore
  createLiquidObjs(arr, cc, "{{novelcx");
  //@ts-ignore
  return arr;
};

function createLiquidObjs(
  arr: any[],
  obj: { [s: string]: unknown } | ArrayLike<unknown> | null,
  field: string
) {
  if (obj === null) return;
  if (typeof obj !== "object") {
    arr.push(field + "}}");
  } else {
    if (Object.keys(obj).length === 0) return;
    const isEmpty = Object.values(obj).every((x) => x === null || x === "");
    const a = !isEmpty && [...Object.values(obj)];
    const k = !isEmpty && [...Object.keys(obj)];
    //@ts-ignore
    for (let i = 0; i < a.length; i++)
      createLiquidObjs(arr, a[i], field + "." + k[i]);
  }
  //  console.log("Checking",arr);
}

export const checkIfLiquidString = (e: { target: { selectionStart: any } }) => {
  const selectionStart = e.target.selectionStart;
  const liquidString = getLiquidString(e);
  //const { word, index } = getLiquidString(e);
  //@ts-ignore
  return (
    liquidString.word.startsWith("{{") &&
    !liquidString.word.endsWith("}}") &&
    liquidString.index < selectionStart - 1
  );
};
export const checkIfInputIsLiquidString = (string: string) => {
  console.log("String that breaks", string);
  return string.startsWith("{{") && string.endsWith("}}");
};
export const getLiquidString = (e: { target: any }) => {
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
