import axios from 'axios'
import consts from '../consts';
import { reset as resetForm, initialize } from 'redux-form';
import { showTabs, selectTab } from '../common/tab/tabActions';

export function getList() {
    const request = axios.get(`${consts.API_URL}/category`);

    return {
        type: 'CATEGORY_FETCHED',
        payload: request,
    };
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        // initialize('', INITIAL_VALUES),
    ]
}