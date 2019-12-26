import React from 'react';
import {NavLink} from 'react-router-dom';

export default function Home() {
    return (
        <div className="home">
            <NavLink to="/checkout/delivery-info" className="button button_400-200">СДЕЛАТЬ ЗАКАЗ</NavLink>
        </div>
    );
}