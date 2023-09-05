//@ts-nocheck
import { takeEvery, put, take, call, cancel, delay, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { eventEmitter } from '../../SharedComponents/events';
import { Liquid } from 'liquidjs';

const DEBOUNCE_DELAY = 200; // Adjust the debounce delay according to your needs

function createDebouncedHandler(fn) {
    let task;
    console.log("Did I come inside this create debounce handler");
    function* debouncedHandler(args) {
      if (task) {
        yield cancel(task);
      }
      task = yield fork(function* () {
        yield delay(DEBOUNCE_DELAY);
        yield call(fn, ...args);
      });
    }
  
    return debouncedHandler;
  }
  

function createEventChannel() {
    const engine = new Liquid();
    console.log("Did I reach in debounce")
    return eventChannel((emit) => {
        const handler = (data, event) => {
            switch (event) {
                case 'reservation.created':
                    data['name'] = data.taskSid;
                    break;
                case 'reservation.accepted':
                    data['name'] = data.taskSid;
                    break;
                case 'taskForm':
                    data['name'] = data.taskSid;
                    break;
                case 'formCreateUpdate':
                    data['name'] = data.formName;
                    break;
                case 'apiRun':
                    data['name'] = data.name;
                    break;
                default:
                    break;
            }
            const emitData = {
                data,
                event
            }
            emit(emitData);
        };

        const debouncedHandler = createDebouncedHandler(function* (data, event) {
            console.log("Did I come inside this debounce");
            yield call(handler, data, event);
        });

        eventEmitter.subscribe('formSubmitApi', handler);
        eventEmitter.subscribe('formCreateUpdate', handler);
        eventEmitter.subscribe('reservation.created', handler);
        eventEmitter.subscribe('reservation.accepted', handler);
        eventEmitter.subscribe('taskForm', handler);
        eventEmitter.subscribe('apiRun', handler);
        
        // Cleanup function to unsubscribe from the event
        return () => {
            eventEmitter.unsubscribe('formSubmitApi');
            eventEmitter.unsubscribe('reservation.created');
            eventEmitter.unsubscribe('taskForm');
            eventEmitter.unsubscribe('formCreateUpdate');
            eventEmitter.unsubscribe('apiRun');
        };
    });
}

function* handleIncomingData(data) {
    console.log("Received data", data);
    // Handle the form submission response
    yield put({ type: 'LIQUIDOBJ_SAVE', data });
}

function* watchEvent() {
    const channel = yield call(createEventChannel);
    console.log("Did I come here?")
    while (true) {
        const emitData = yield take(channel);
        
        const { data } = emitData;
        switch (emitData.event) {
            case 'formSubmitApi':
                // Handle form submit API event
                yield call(handleIncomingData, data);
                break;
            case 'formCreateUpdate':
                // Handle form submit API event
                yield call(handleIncomingData, data);
                break;
            case 'reservation.created':
                //const updatedData = yield call(getFormsForTask, 2, data);
                const updatedData = [];
                //const updatedWithtaskRules = yield call(getTaskRules, updatedData);
                const updatedWithtaskRules = [];
                yield call(handleIncomingData, updatedWithtaskRules);
                break;
            case 'reservation.accepted':
                // Handle reservation accepted event
                // Add your logic here
                break;
            case 'taskForm':
                // Handle task form event   
                yield call(handleIncomingData, data);
                break;
            case 'apiRun':
                // Handle task form event   
                yield call(handleIncomingData, data);
                break;
            default:
                // Handle any other events
                // Add your logic here
                break;
        }
    }
}

export default watchEvent;