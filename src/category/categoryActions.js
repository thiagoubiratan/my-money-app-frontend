import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { reset as resetForm, initialize } from 'redux-form';
import { showTabs, selectTab } from '../common/tab/tabActions';
import consts from '../consts';

// Valores iniciais para o formulário de Categoria
const INITIAL_VALUES = { description: '' };

export function getList() {
    const request = axios.get(`${consts.API_URL}/category`);
    return {
        type: 'CATEGORY_FETCHED',
        payload: request,
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
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('categoryForm', INITIAL_VALUES) // <-- aqui inicializa o form
    ];
}

// Caso queira no futuro preparar edição e exclusão de categoria:
export function showUpdate(category) {
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('categoryForm', category)
    ];
}

export function showDelete(category) {
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('categoryForm', category)
    ];
}
