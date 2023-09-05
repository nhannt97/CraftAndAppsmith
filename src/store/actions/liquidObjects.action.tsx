//@ts-nocheck
const actionNamePrefix = "LIQUIDOBJ";
export const LIQUIDOBJ_LOAD = `${actionNamePrefix}_LOAD`;
export const LIQUIDOBJ_SAVE = `${actionNamePrefix}_SAVE`;
export const LIQUIDOBJ_SAVE_ARRAY = `${actionNamePrefix}_SAVE_ARRAY`;
export const LIQUIDOBJ_ERROR = `${actionNamePrefix}_ERROR`;

export interface LoadLiquid {
    type: typeof LIQUIDOBJ_LOAD,
    data: Array<Object>
} 

export interface SaveLiquid {
    type: typeof LIQUIDOBJ_SAVE,
    data: Object
} 
export interface SaveLiquidArray {
    type: typeof LIQUIDOBJ_SAVE_ARRAY,
    data: Array<Object>,
    from: string
} 
export type LiquidAction = LoadLiquid | SaveLiquid | SaveLiquidArray;

export const loadLiquid = () => async (dispatch: any) => {
    dispatch({
        type: LIQUIDOBJ_LOAD,
    });
}

export const saveLiquid = (saveObject) => async (dispatch: any) => {
    console.log("each time", saveObject)
    dispatch({
        type: LIQUIDOBJ_SAVE,
        data: saveObject
    });
}

export const saveLiquidArray = (saveArray, from) => async (dispatch: any) => {
    dispatch({
        type: LIQUIDOBJ_SAVE_ARRAY,
        data: saveArray,
        from: from
    });
}