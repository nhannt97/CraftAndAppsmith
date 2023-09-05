//@ts-nocheck
import { LIQUIDOBJ_LOAD, LIQUIDOBJ_SAVE, LIQUIDOBJ_SAVE_ARRAY, LiquidAction, LoadLiquid, SaveLiquid, SaveLiquidArray } from "../actions/liquidObjects.action"
import createReducer from "./createReducer";

export interface LiquidObjectState {
    state: string;
    error: string;
    data: any;
}

const initialState:LiquidObjectState = {
    state: null,
    error: null,
    data: []
}

function loadLiquidObjects(state:LiquidObjectState, action:LoadLiquid):LiquidObjectState {
    return {
        ...state,
        state: action.type,
        error: null,
        data: action.data
    }
}

function saveLiquidObjects(state:LiquidObjectState, action:SaveLiquid):LiquidObjectState {
    console.log("Received data",action);
    let updatedData  = {...state.data};
    let newData = action.data;
    if (updatedData.hasOwnProperty(newData['name'])) {
        if (newData.hasOwnProperty('response') && newData['response'].hasOwnProperty('data') ) {
            newData['response'] = newData['response']['data'];
        }
        updatedData[newData['name']] = {
            ...updatedData[newData['name']],
            ...newData
        }
    } else {
            // Create a new property
            updatedData[newData['name']] = newData;
    }    
    console.log("Updated array", updatedData)
    return {
        ...state,
        state: action.type,
        error: null,
        data: updatedData
    }
}

const mapComponentData = (updatedFormData) => {
    console.log("Updated form data", updatedFormData);
    if (updatedFormData.hasOwnProperty("components")) {
        const componentMap = {};

        updatedFormData['components'].forEach((component) => {
            componentMap[component.key] = component;
        });

        console.log(componentMap);
        //@ts-ignore
        updatedFormData['components'] = componentMap;
    }
    return updatedFormData;
}

function saveLiquidArray(state:LiquidObjectState, action:SaveLiquidArray):LiquidObjectState {
    let liquidOjs = state.data;    
    const apiObjects = {}; const formObjs = {};
    if (action.from === "api") {
        action.data.forEach(element => {
            //@ts-ignore
            apiObjects[element.name] =  element.sampleResponse ? { sampleResponse:  JSON.parse(element.sampleResponse)["data"] } : null;
        });
        liquidOjs = {...apiObjects};
    }
    if (action.from === "form") {
        action.data.forEach(element => {
            //@ts-ignore
            formObjs[element.formName] = element;
            //@ts-ignore
            let formDefinition = JSON.parse(element.formDefinition) ;
            //@ts-ignore
            if (element.formType == "formIO") {
                formDefinition = mapComponentData(formDefinition);
            }
            //@ts-ignore
            formObjs[element.formName]["formDefinition"] = formDefinition;           
        });
        liquidOjs = {...liquidOjs,...formObjs};
    }  
    console.log("Objs from stte",liquidOjs);
    return {
        ...state,
        state: action.type,
        error: null,
        data: liquidOjs
    }
}

const LiquidObjectsReducer =
    (state: LiquidObjectState, action: LiquidAction): LiquidObjectState => {

        const fnUpdateState = createReducer(initialState, {
            [LIQUIDOBJ_LOAD]: loadLiquidObjects,
            [LIQUIDOBJ_SAVE]: saveLiquidObjects,
            [LIQUIDOBJ_SAVE_ARRAY]: saveLiquidArray
        });

        return fnUpdateState(state, action);
    }

export default LiquidObjectsReducer;

