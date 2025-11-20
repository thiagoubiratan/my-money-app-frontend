import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { reset as resetForm, initialize } from 'redux-form';
import { showTabs, selectTab } from '../common/tab/tabActions';
import consts from '../consts';

const INITIAL_VALUES = { credits: [{}], debts: [{}] };

export const showLoading = () => ({ type: 'SHOW_LOADING' });
export const hideLoading = () => ({ type: 'HIDE_LOADING' });

export function getList() {
    const request = axios.get(`${consts.API_URL}/billingCycles`);

    return {
        type: 'BILLING_CYCLES_FETCHED',
        payload: request,
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
        initialize('billingCycleForm', billingCycle),
    ];
}

export function showDelete(billingCycle) {
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('billingCycleForm', billingCycle),
    ];
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('billingCycleForm', INITIAL_VALUES),
    ];
}

export function copyBillingCycle(id) {
    return (dispatch) => {
        console.log("Entrou para chamar a API com ID: " + id);
        dispatch(showLoading()); // Mostra o loading

        // Vamos mudar o método para 'POST', conforme solicitado
        axios
            .post(`${consts.API_URL}/billingCycles/duplicate/${id}`) // Alterado para POST
            .then((resp) => {
                const billingCycle = resp.data;

                toastr.success('Sucesso', 'Ciclo de pagamento copiado para o formulário!');

                 // Agora garantimos a navegação para a página de listagem
                 dispatch(getList()); // Atualizar a lista de ciclos de pagamento

                 // Exibe a tab de listagem após a cópia
                 dispatch(showTabs('tabList'));
                 dispatch(selectTab('tabList'));
                
            })
            .catch((e) => {
                console.error('Erro ao copiar ciclo de pagamento:', e);
                toastr.error('Erro', 'Não foi possível copiar o ciclo de pagamento.');
            })
            .finally(() => {
                dispatch(hideLoading()); // Esconde o loading
            });
    };
}

function submit(values, method) {
    // Transformar valores antes de enviar à API
    const transformedValues = {
        ...values,
        debts: values.debts.map((debt) => ({
            ...debt,
            paymentday: debt.paymentday ? parseInt(debt.paymentday, 10) : undefined, // Converte para número
            paymentDate: debt.paymentDate
                ? new Date(debt.paymentDate).toISOString()
                : undefined, // Converte para data ISO
        })),
    };

    return (dispatch) => {
        const id = transformedValues._id ? transformedValues._id : '';
        dispatch(showLoading()); // Mostra o loading
        axios[method](`${consts.API_URL}/billingCycles/${id}`, transformedValues)
            .then((resp) => {
                toastr.success('Sucesso', 'Operação realizada com sucesso.');
                dispatch(init());
            })
            .catch((e) => {
                if (e.response && e.response.data && e.response.data.errors) {
                    e.response.data.errors.forEach((error) =>
                        toastr.error('Erro', error)
                    );
                } else {
                    toastr.error('Erro', 'Ocorreu um erro inesperado.');
                }
            })
            .finally(() => {
                dispatch(hideLoading()); // Esconde o loading
            });
    };
}