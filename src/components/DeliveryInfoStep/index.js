import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loadCountries, setDeliveryInfoStatus} from "../../actionCreators";
import {countries} from '../../data';

class DeliveryInfoStep extends React.Component {
    static propTypes = {
        //countries: PropTypes.array,
        loadCountries: PropTypes.func,
        setDeliveryInfoStatus: PropTypes.func
    }

    state = {
        reg: {
            fullName: /^[А-ЯЁ][а-яё-]{1,40}\s[А-ЯЁ][а-яё-]{1,20}\s[А-ЯЁ][а-яё]{1,20}$/i,
            city: /^[А-ЯЁ][а-яё-]{1,20}$/i,
            country: /^[1-9][0-9]{0,2}$/,
            address: /^[а-яё0-9 .,\\/-]{5,30}$/i,
            postcode: /^[0-9]{6,10}$/
        },
        isValid: true,
        fullNameValid: false,
        cityValid: false,
        addressValid: false,
        countryValid: false,
        postcodeValid: false
    }

    componentDidMount() {
        //this.props.loadCountries();
    }

    render() {
        const {isValid, fullNameValid, cityValid, addressValid, countryValid, postcodeValid} = this.state;
        return (
            <div className="form-container">
                <div className="form-container__nav">
                    <div className="form-container__nav-link form-container__nav-link_active" >Доставка</div>
                    <div className="arrow">
                        <div className="arrow-top"></div>
                        <div className="arrow-bottom"></div>
                    </div>
                    <div className="form-container__nav-link">Оплата</div>
                </div>
                <h1 className="title">Информация для доставки</h1>
                <form className="form">
                    <div className="grid-container_1">
                        <span className="form__name item-1">Получатель</span>
                        <input onChange={this.getFullName} style={{borderColor: !isValid && !fullNameValid ? '#f02e3e' : '#DEDCDC'}} type="text"
                               placeholder="ФИО" className="form__field item-1"/>

                        <span className="form__name item-1">Адрес</span>
                        <input onChange={this.getCity} style={{borderColor: !isValid && !cityValid ? '#f02e3e' : '#DEDCDC'}} type="text"
                               placeholder="Город " className="form__field item-1"/>
                        <input onChange={this.getAddress} style={{borderColor: !isValid && !addressValid ? '#f02e3e' : '#DEDCDC'}} type="text"
                               placeholder="Адрес" className="form__field item-1"/>
                        <select onChange={this.getCountry} style={{
                            color: this.state.countryValid ? '#000' : '#808080',
                            borderColor: !isValid && !countryValid ? '#f02e3e' : '#DEDCDC'
                        }} className="form__field item-2">
                            <option value="0">Страна</option>
                            {/*{this.props.countries.map((item) => <option value={item.id}>{item.name}</option>)}*/}
                            {Object.keys(countries).map(title => ({id: title, name: countries[title]})).map((item) => <option value={item.id}>{item.name}</option>)}
                        </select>
                        <input onChange={this.getPostcode} style={{borderColor: !isValid && !postcodeValid ? '#f02e3e' : '#DEDCDC'}} type="text"
                               placeholder="Индекс" className="form__field item-3"/>
                        <input type="button" onClick={this.toPayment} className="item-2 button" value="Продолжить"/>
                    </div>
                </form>
            </div>
        )
    }
    getFullName = (e) => {
        if(e.target.value.search(this.state.reg.fullName) !== -1)
            this.setState({fullNameValid: true});
        else {
            if(this.state.fullNameValid)
                this.setState({fullNameValid: false});
        }
    }
    getCity = (e) => {
        if(e.target.value.search(this.state.reg.city) !== -1)
            this.setState({cityValid: true});
        else {
            if(this.state.cityValid)
                this.setState({cityValid: false});
        }
    }
    getAddress = (e) => {
        if(e.target.value.search(this.state.reg.address) !== -1)
            this.setState({addressValid: true});
        else {
            if(this.state.addressValid)
                this.setState({addressValid: false});
        }
    }
    getCountry = (e) => {
        if(e.target.value.search(this.state.reg.country) !== -1)
            this.setState({countryValid: true});
        else {
            if(this.state.countryValid)
                this.setState({countryValid: false});
        }
    }
    getPostcode = (e) => {
        if(e.target.value.search(this.state.reg.postcode) !== -1)
            this.setState({postcodeValid: true});
        else {
            if(this.state.postcodeValid)
                this.setState({postcodeValid: false});
        }
    }

    toPayment = () => {
        const {fullNameValid, cityValid, addressValid, countryValid, postcodeValid} = this.state;
        if (!fullNameValid || !cityValid || !addressValid || !countryValid || !postcodeValid) this.setState({isValid: false});
        else {
            this.setState({isValid: true});
            this.props.setDeliveryInfoStatus();
            this.props.history.push('/checkout/payment');
        }
    };
};

export default connect(null, {setDeliveryInfoStatus})(DeliveryInfoStep);
//export default connect(({countries}) => ({countries}), {loadCountries, setDeliveryInfoStatus})(DeliveryInfoStep);