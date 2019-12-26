import {combineReducers} from 'redux';
import countries from './countries';
import deliveryInfoStatus from './deliveryInfoStatus';
import paymentStatus from './paymentStatus';

export default combineReducers({countries, deliveryInfoStatus, paymentStatus});