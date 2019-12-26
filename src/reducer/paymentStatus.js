import {PAYMENT_STATUS} from '../actionConst';

export default (state = false, action) => {
    switch (action.type){
        case PAYMENT_STATUS: return action.payload.status;
        default: return state;
    }
}