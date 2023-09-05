import { createStore, applyMiddleware, compose } from "redux";
//import rootReducer from "./reducers/createReducer";
import reducers from './reducers';
import middlewares, { sagaMiddleware } from './middleware/middleware';
import rootSaga from "./sagas/index";

const composeEnhancers = (process.env.NODE_ENV === 'development' ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : undefined) || compose;
//Apply thunk and saga middlewear
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(
        ...middlewares
    )),
);
// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;