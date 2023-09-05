//@ts-nocheck
import { combineReducers } from "redux";
import LiquidObjectsReducer, { LiquidObjectState } from "./reducers/liquidObjects.reducer";

export interface RootState {  
  liquidObjectState:LiquidObjectState
}

const rootReducer = combineReducers<RootState>({  
  liquidObjectState:LiquidObjectsReducer
});

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;