import React, { Component } from 'react'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import consts from '../consts'
import Messages from '../common/msg/messages'

class ResetPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '', confirmPassword: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()

    const { password, confirmPassword } = this.state
    const token = this.props.params.token

    if (password !== confirmPassword) {
      return toastr.error('Erro', 'As senhas não coincidem.')
    }

    axios.post(`${consts.OAPI_URL}/reset-password`, { token, password })
      .then(() => {
        toastr.success('Sucesso', 'Senha redefinida com sucesso!')
        this.setState({ password: '', confirmPassword: '' })
      })
      .catch(err => {
        const msg = (err.response && err.response.data && err.response.data.message) || 'Erro ao redefinir a senha.'
        toastr.error('Erro', msg)
      })
  }

  render() {
    return (
      <div className="login-box">
        <div className="login-logo"><b>ESFin</b></div>
        <div className="login-box-body">
          <p className="login-box-msg">Redefinir Senha</p>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group has-feedback">
              <input
                type="password"
                className="form-control"
                placeholder="Nova Senha"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group has-feedback">
              <input
                type="password"
                className="form-control"
                placeholder="Confirmar Senha"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-flat">Redefinir</button>
            <Messages />
          </form>
        </div>
      </div>
    )
  }
}

export default ResetPassword
