import React, { Component } from 'react'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import consts from '../consts'

class ForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.state = { email: '', sent: false }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ email: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post(`${consts.OAPI_URL}/forgot-password`, { email: this.state.email })
      .then(() => {
        this.setState({ sent: true })
        toastr.success('Sucesso', 'E-mail de recuperação enviado!')
      })
      .catch(err => {
        const msg = (err.response && err.response.data && err.response.data.message) || 'Erro ao solicitar recuperação.';
        toastr.error('Erro', msg)
      })
  }

  render() {
    return (
      <div className="login-box">
        <div className="login-logo">
          <i className='fa fa-bank'></i>
          <b> ESFin</b>
        </div>
        <div className="login-box-body">
          <p className="login-box-msg">Entre com e-mail para recuperar a senha</p>

          {this.state.sent ? (
            <p className="">
              <strong>
                Um link de redefinição de senha foi enviado para seu e-mail.
              </strong>
            </p>
          ) : (
            <form onSubmit={this.handleSubmit}>
              <div className="form-group has-feedback">
                <input
                  type="email"
                  className="form-control"
                  placeholder="E-mail"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <button type="submit" className="btn btn-primary btn-block btn-flat">
                    <i className="fa fa-send" style={{ marginRight: 6 }}></i>
                    Enviar Link
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    )
  }
}

export default ForgotPassword
