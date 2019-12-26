import {DELIVERY_INFO_STATUS} from '../actionConst';

export default (state = false, action) => {
    switch (action.type){
        case DELIVERY_INFO_STATUS: return action.payload.status;
        default: return state;
    }
}