import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { reset as resetForm, initialize } from 'redux-form';
import { showTabs, selectTab } from '../common/tab/tabActions';
import consts from '../consts';

const INITIAL_VALUES = { credits: [{}], debts: [{}] };

export const showLoading = () => ({ type: 'SHOW_LOADING' });
export const hideLoading = () => ({ type: 'HIDE_LOADING' });

export function getList() {
    return (dispatch) => {
        // Não precisa de showLoading() aqui, pois submit() ou init() já o fazem.
        axios.get(`${consts.API_URL}/billingCycles`)
            .then(resp => {
                dispatch({ type: 'BILLING_CYCLES_FETCHED', payload: resp });
                dispatch(hideLoading()); // Finaliza o loading aqui!
            })
            .catch(e => toastr.error('Erro', 'Não foi possível carregar a lista.'));
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
    return (dispatch) => {
        dispatch(showLoading());
        setTimeout(() => {
            dispatch(showTabs('tabUpdate'));
            dispatch(selectTab('tabUpdate'));
            dispatch(initialize('billingCycleForm', billingCycle));
            dispatch(hideLoading());
        }, 100); // Pequeno delay para garantir que o loading seja visível
    };
}

export function showDelete(billingCycle) {
    return (dispatch) => {
        dispatch(showLoading());
        setTimeout(() => {
            dispatch(showTabs('tabDelete'));
            dispatch(selectTab('tabDelete'));
            dispatch(initialize('billingCycleForm', billingCycle));
            dispatch(hideLoading());
        }, 100); // Pequeno delay para garantir que o loading seja visível
    };
}

export function init() {
    return (dispatch) => {
        dispatch(showLoading()); // Inicia o loading aqui!
        dispatch(showTabs('tabList', 'tabCreate'));
        dispatch(selectTab('tabList'));
        dispatch(getList());
        dispatch(initialize('billingCycleForm', INITIAL_VALUES));
    };
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
            });
    };
}