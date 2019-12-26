import {LOAD_ALL_COUNTRIES, DELIVERY_INFO_STATUS, PAYMENT_STATUS} from './actionConst'

export const loadCountries = () => ({
    type: LOAD_ALL_COUNTRIES,
    payload: {},
    api: 'https://namaztimes.kz/ru/api/country?type=json'
});

export const setDeliveryInfoStatus = (status = true) => ({
    type: DELIVERY_INFO_STATUS,
    payload: {
        status
    }
});

export const setPaymentStatus = (status = true) => ({
    type: PAYMENT_STATUS,
    payload: {
        status
    }
})