import {LOAD_ALL_COUNTRIES} from '../actionConst'

export default (state = [], action) => {
    const {response: res} = action;
    switch (action.type) {
        case LOAD_ALL_COUNTRIES:
            return Object.keys(res).map(title => ({id: title, name: res[title]}));
        default:
            return state;
    }
}