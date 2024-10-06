import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { reset as resetForm, initialize } from 'redux-form';
import { showTabs, selectTab } from '../common/tab/tabActions';
import consts from '../consts'

const INITAL_VALUES = { credits: [{}], debts: [{}] };

export function getList() {
    const request = axios.get(`${consts.API_URL}/billingCycles`);

    return {
        type: 'BILLING_CYCLES_FETCHED',
        payload: request
    };
}

export function create(values) {
    return submit(values, 'post');
}

export function update(values) {
    return submit(values, 'put');
}

export function remove(values) {
    return submit(values, 'delete');
}

export function showUpdate(billingCycle) {
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('billingCycleForm', billingCycle)
    ];
}

export function showDelete(billingCycle) {
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('billingCycleForm', billingCycle)
    ];
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('billingCycleForm', INITAL_VALUES)
    ];
}

function submit(values, method) {
    // Transformar valores antes de enviar à API
    const transformedValues = {
        ...values,
        debts: values.debts.map(debt => ({
            ...debt,
            paymentday: debt.paymentday ? parseInt(debt.paymentday, 10) : undefined, // Converte para número
            paymentDate: debt.paymentDate ? new Date(debt.paymentDate).toISOString() : undefined // Converte para data ISO
        }))
    };

    console.log(transformedValues); // Verificar os valores transformados

    return dispatch => {
        const id = transformedValues._id ? transformedValues._id : '';
        axios[method](`${consts.API_URL}/billingCycles/${id}`, transformedValues)
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso.');
                dispatch(init());
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error));
            });
    };
}

