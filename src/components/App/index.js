import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '../../store';
import DeliveryInfoStep from '../DeliveryInfoStep';
import PaymentStep from '../PaymentStep';
import SuccessStep from '../SuccessStep';
import Home from '../Home';
import './index.scss';

export default function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="app">
                    <Route path="/" exact component={Home}/>
                    <Route path="/checkout" exact component={() => ""}/>
                    <Route path="/checkout/delivery-info" component={DeliveryInfoStep}/>
                    <Route path="/checkout/payment" component={PaymentStep}/>
                    <Route path="/checkout/success" component={SuccessStep}/>
                </div>
            </Router>
        </Provider>
    );
}

