import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setPaymentStatus} from "../../actionCreators";

class PaymentStep extends React.Component {
    static propTypes = {
        deliveryInfoStatus: PropTypes.bool,
        setPaymentStatus: PropTypes.func
    }
    state = {
        cardNumber: '',
        cardTerm: '',
        cardValue: '',
        reg: {
            cardTitle: /^[A-Z][a-zA-Z]{1,20}\s[A-Z][a-zA-Z]{1,20}$/
            // cardNumber: /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/,
            // cardTerm: /^(0\d|1[0-2])\/2[0-3]$/,
            // cardValue: /^[0-9]{3}$/
        },
        isValid: true,
        cardTitleValid: false,
        cardNumberValid: false,
        cardTermValid: false,
        cardValueValid: false
    }

    componentDidMount() {
        if(!this.props.deliveryInfoStatus)
            this.props.history.push('/checkout/delivery-info');
    }

    render() {
        const {isValid, cardTitleValid, cardNumberValid, cardTermValid, cardValueValid} = this.state;
        return (
            <div className="form-container">
                <div className="form-container__nav">
                    <div className="form-container__nav-link">Доставка</div>
                    <div className="arrow">
                        <div className="arrow-top"></div>
                        <div className="arrow-bottom"></div>
                    </div>
                    <div className="form-container__nav-link form-container__nav-link_active">Оплата</div>
                </div>
                <h1 className="title">Оплата</h1>
                <form className="form">
                    <div className="grid-container_2">
                        <span className="form__name item-1">Имя на карте</span>
                        <input style={{borderColor: !isValid && !cardTitleValid ? '#f02e3e' : '#DEDCDC'}}
                               onChange={this.getCardTitle} type="text" placeholder="Konstantin Ivanov"
                               className="form__field item-1"/>

                        <span className="form__name item-1">Номер карты</span>
                        <input style={{borderColor: !isValid && !cardNumberValid ? '#f02e3e' : '#DEDCDC'}}
                               value={this.state.cardNumber} onKeyDown={this.getCardNumber} type="text"
                               placeholder="XXXX XXXX XXXX XXXX " className="form__field item-1"/>

                        <span className="form__name item-2">Срок</span>
                        <input style={{borderColor: !isValid && !cardTermValid ? '#f02e3e' : '#DEDCDC'}}
                               value={this.state.cardTerm} onKeyDown={this.getCardTerm} type="text"
                               placeholder="MM / YY" className="form__field item-4"/>

                        <span className="form__name item-3">CVV</span>
                        <input style={{borderColor: !isValid && !cardValueValid ? '#f02e3e' : '#DEDCDC'}}
                               onKeyDown={this.getCardValue} value={this.state.cardValue} type="text" placeholder=""
                               className="form__field item-5"/>
                        <input type="button" onClick={this.toSuccess} className="item-6 button" value="Оплатить"/>
                    </div>
                </form>
            </div>
        )
    }

    getCardTitle = (e) => {
        if (e.target.value.search(this.state.reg.cardTitle) !== -1)
            this.setState({cardTitleValid: true});
        else {
            if (this.state.cardTitleValid)
                this.setState({cardTitleValid: false});
        }
    }

    getCardNumber = event => {
        const {cardNumber: val} = this.state;
        const key = event.keyCode;

        const lastIndex = val.slice(-1);//последний символ ввоодимой строки
        const close = val.split(' ').join('').split('');//получаем строку ввиде массива удаляя все пробелы
        if (key === 8) {//Удаление
            this.setState({cardNumberValid: false});
            if (lastIndex === ' ') return this.setState({cardNumber: val.slice(0, -2)});//Если при удалении символов попадется пробел, то "перескакиваем его" и захватываем символ после него
            return this.setState({cardNumber: val.slice(0, -1)})//Иначе удаляем очередной символ
        }

        if ((key >= 48 && key < 58) && close.length < 16) {//Проерка на ввод числа и на размер воодимой строки
            if (close.length + 1 === 16) this.setState({cardNumberValid: true});
            if ((close.length + 1) % 4 === 0 && (close.length + 1) < 16)//Добавление пробела при вводе очереной группы из 4х цифр, не превышая предела ввода
                return this.setState({cardNumber: val + String.fromCharCode(key) + ' '});
            return this.setState({cardNumber: val + String.fromCharCode(key)});
        }
    }

    getCardTerm = event => {
        const {cardTerm: val} = this.state;
        const key = event.keyCode;
        const lastIndex = val.slice(-1);

        if (key === 8) {
            this.setState({cardTermValid: false});
            if (lastIndex === '/') return this.setState({cardTerm: val.slice(0, -2)});
            return this.setState({cardTerm: val.slice(0, -1)});
        }

        if ((key >= 48 && key < 58) && val.length < 5) {
            if (val.length + 1 === 5) this.setState({cardTermValid: true});
            if (val.length === 0 && key > 49) return;//Номер месяца может начинаться либо с '0', либо с '1'
            if (val.length === 1 && lastIndex === '1' && key > 50) return;//Если номер месяца начинатеся с '1', то должен закончится от '0' до '2'
            if (val.length === 1 && lastIndex === '0' && key < 49) return;//Если номер месяца начинатеся с '0', то он не может закончится нулём
            if (val.length === 2) return this.setState({cardTerm: val + '/' + String.fromCharCode(key)});
            return this.setState({cardTerm: val + String.fromCharCode(key)})
        }
    }

    getCardValue = event => {
        const {cardValue: val} = this.state;
        const key = event.keyCode;

        if (key === 8) {
            this.setState({cardValueValid: false});
            return this.setState({cardValue: val.slice(0, -1)});
        }

        if ((key >= 48 && key < 58) && val.length < 3) {
            if (val.length + 1 === 3) this.setState({cardValueValid: true});
            return this.setState({cardValue: val + String.fromCharCode(key)})
        }
    }

    toSuccess = () => {
        const {cardTitleValid, cardNumberValid, cardTermValid, cardValueValid} = this.state;
        if (!cardTitleValid || !cardNumberValid || !cardTermValid || !cardValueValid) this.setState({isValid: false});
        else {
            this.setState({isValid: true});
            this.props.setPaymentStatus();
            this.props.history.push('/checkout/success');
        }
    };
};

export default connect(({deliveryInfoStatus}) => ({deliveryInfoStatus}), {setPaymentStatus})(PaymentStep);
