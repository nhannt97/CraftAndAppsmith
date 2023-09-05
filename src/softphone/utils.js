import Axios from "axios";
import moment from "moment";
import { CALL_ONCALL } from "../store/actions/activeCalls.action";
import { getDuration } from "../vendor/staff/manageAgentSchedule/util";

export const handleHangUpApi = async (workspaceSid, loggedInAgentName, worker, selectedTask) => {
    var request = {
        "workspacesid": workspaceSid,
        "agentname": loggedInAgentName
    }
    if (selectedTask.attributes.direction === 'outbound' ||  selectedTask.attributes.direction === 'inbound-transfer'||  selectedTask.attributes.direction === 'inbound-conference' ) {            
        const params = {"AssignmentStatus":"wrapping"};
        worker.updateTask(selectedTask.sid, params,
            function(error, updatedTask) {
                if(error) {
                    console.log(error.code);
                    console.log(error.message);
                    return;
                }
                console.log("Updated Task Priority: "+updatedTask);
            }
        );
    }
    try {
        const res = await Axios.post(`https://uy5154u0f0.execute-api.us-east-1.amazonaws.com/qa/set`, request);
    } catch (e) {
        console.log(e)
    }
}

export const handleReject = async (workspaceSid, reservationId, selectedTask) => {    
    var request = null;
    if (selectedTask.attributes.direction === 'inbound-conference' ) {            
        request = {
            "type": "confreject",
            "workspacesid": workspaceSid,
            "reservation": reservationId
        }        
    } else if (selectedTask.attributes.direction === 'inbound-transfer' ) {            
        request = {
            "type": "transferreject",
            "workspacesid": workspaceSid,
            "reservation": reservationId
        }        
    }
    if (request !== null) {
        try {
            const response = await Axios.post("https://ljw5htb7ib.execute-api.us-east-2.amazonaws.com/qa/wrapup", request);
        } catch (e) {
            console.log(e)
        }    
    }
}

export const handleCallTimers = (currentState) => {
    let timer = 0;
    if (currentState.state === 'CALL_STARTED_SUCCESS' || currentState.state === CALL_ONCALL) {
        const currentTime = moment(Date.now()).utc().format();
        const duration = getDuration(currentState.callAcceptTime, currentTime);
        let durationMS = duration.asMilliseconds();
        durationMS = durationMS < 0 ? 0 : durationMS;
        timer = durationMS;
    }
    if (currentState.state === 'CALL_END_SUCCESS') {
        const currentTime = moment(Date.now()).utc().format();
        const duration = getDuration(currentState.callEndTime, currentTime);
        let durationMS = duration.asMilliseconds();
        durationMS = durationMS < 0 ? 0 : durationMS;
        timer = durationMS;
    }
    return timer;

}

export function formatParams(params) {
    return "?" + Object
        .keys(params)
        .map(function (key) {
            return key + "=" + encodeURIComponent(params[key])
        })
        .join("&")
}