import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { reset as resetForm, initialize } from 'redux-form';
import { showTabs, selectTab } from '../common/tab/tabActions';
import consts from '../consts';

// Valores iniciais para o formulário de Categoria
const INITIAL_VALUES = { description: '' };

export const showLoading = () => ({ type: 'SHOW_LOADING' });
export const hideLoading = () => ({ type: 'HIDE_LOADING' });

export function getList() {
    return (dispatch) => {
        axios.get(`${consts.API_URL}/category`)
            .then(resp => {
                dispatch({ type: 'CATEGORY_FETCHED', payload: resp });
                dispatch(hideLoading()); // Finaliza o loading aqui!
            })
            .catch(e => {
                toastr.error('Erro', 'Não foi possível carregar a lista de categorias.');
                dispatch(hideLoading()); // Garante que o loading finalize em caso de erro.
            });
    };
}

export function create(values) {
    return submit(values, 'post');
}

// Aqui você já pode preparar também para no futuro fazer update e delete:
export function update(values) {
    return submit(values, 'put');
}

export function remove(values) {
    return submit(values, 'delete');
}

function submit(values, method) {
    return dispatch => {
        const id = values._id ? values._id : '';
        const url = id ? `${consts.API_URL}/category/${id}` : `${consts.API_URL}/category`;
        dispatch(showLoading());
        axios[method](url, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso.');
                dispatch(init());
            })
            .catch(e => {
                if (e.response && e.response.data && e.response.data.errors) {
                    e.response.data.errors.forEach(error => toastr.error('Erro', error));
                } else {
                    toastr.error('Erro', 'Erro ao processar requisição.');
                }
            });
    };
}

// Quando clicar em "Novo" ou ao iniciar o módulo
export function init() {
    return (dispatch) => {
        dispatch(showLoading()); // Inicia o loading aqui!
        dispatch(showTabs('tabList', 'tabCreate'));
        dispatch(selectTab('tabList'));
        dispatch(getList());
        dispatch(initialize('categoryForm', INITIAL_VALUES));
    };
}

// Caso queira no futuro preparar edição e exclusão de categoria:
export function showUpdate(category) {
    return (dispatch) => {
        dispatch(showLoading());
        setTimeout(() => {
            dispatch(showTabs('tabUpdate'));
            dispatch(selectTab('tabUpdate'));
            dispatch(initialize('categoryForm', category));
            dispatch(hideLoading());
        }, 100); // Pequeno delay para garantir que o loading seja visível
    };
}

export function showDelete(category) {
    return (dispatch) => {
        dispatch(showLoading());
        setTimeout(() => {
            dispatch(showTabs('tabDelete'));
            dispatch(selectTab('tabDelete'));
            dispatch(initialize('categoryForm', category));
            dispatch(hideLoading());
        }, 100); // Pequeno delay para garantir que o loading seja visível
    };
}
