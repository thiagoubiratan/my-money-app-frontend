import { toastr } from 'react-redux-toastr'
import axios from 'axios'
import consts from '../consts'

export function login(values) {
  return submit(values, `${consts.OAPI_URL}/login`)
}

export function signup(values) {
  return submit(values, `${consts.OAPI_URL}/register`)
}

function submit(values, url) {
  return dispatch => {
    axios.post(url, values)
      .then(resp => {
        dispatch([{
          type: 'USER_FETCHED',
          payload: resp.data
        }])
      })
      .catch(e => {
        // Verifica se há uma mensagem de erro no response
        if (e.response && e.response.data && e.response.data.message) {
          toastr.error('Erro', e.response.data.message)  // Exibe a mensagem de erro retornada pela API
        } else {
          toastr.error('Erro', 'Ocorreu um erro ao processar sua solicitação.')  // Mensagem genérica
        }
      })
  }
}

export function logout() {
  return { type: 'TOKEN_VALIDATED', payload: false }
}

export function validateToken(token) {
  return dispatch => {
    if (token) {
      axios.post(`${consts.OAPI_URL}/validateToken`, { token })
        .then(resp => {
          dispatch({
            type: 'TOKEN_VALIDATED',
            payload: resp.data.valid
          })
        })
        .catch(e => dispatch({
          type: 'TOKEN_VALIDATED',
          payload: false
        }))
    } else {
      dispatch({
        type: 'TOKEN_VALIDATED',
        payload: false
      })
    }
  }
}

export function updatePassword(values, onSuccess) {
  return dispatch => {
    axios.put(`${consts.OAPI_URL}/updateUser`, values)
      .then(resp => {
        toastr.success('Sucesso', 'Senha atualizada com sucesso!');
        if (onSuccess) onSuccess(); // Ex: fechar o modal
      })
      .catch(e => {
        const msg = 'Erro ao atualizar senha';
        toastr.error('Erro', msg);
      });
  };
}
