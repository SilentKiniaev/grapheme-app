import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class SuccessStep extends React.Component {
    static propTypes = {
        paymentStatus: PropTypes.bool
    }

    componentDidMount() {
        if(!this.props.paymentStatus)
            this.props.history.push('/checkout/delivery-info');
    }

    render() {
        return (
            <div className="form-container form-container_center">
                <div className="success-logo"></div>
                <div className="success-title">Спасибо!</div>
            </div>
        )
    }
}

export default connect(({paymentStatus}) => ({paymentStatus}))(SuccessStep);