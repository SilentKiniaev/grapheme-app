import {applyMiddleware} from 'redux';
import api from './api';

export default applyMiddleware(api);