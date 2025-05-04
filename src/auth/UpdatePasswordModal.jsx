import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updatePassword } from './authActions' // certifique-se que essa action existe
import { toastr } from 'react-redux-toastr'

class UpdatePasswordModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    const { oldPassword, newPassword, confirmPassword } = this.state
    const { email, updatePassword, onClose } = this.props

    if (newPassword !== confirmPassword) {
        toastr.error('Erro', 'As novas senhas não coincidem.')  // Mensagem genérica
      return
    }

    updatePassword({ email, oldPassword, newPassword }, onClose)
  }

  render() {
    const { onClose } = this.props
    const { oldPassword, newPassword, confirmPassword } = this.state

    return (
      <div className="modal fade in" style={{ display: 'block' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={this.handleSubmit}>
              <div className="modal-header">
                <button type="button" className="close" onClick={onClose}>
                  &times;
                </button>
                <h4 className="modal-title">Atualizar Senha</h4>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Senha Atual</label>
                  <input
                    type="password"
                    name="oldPassword"
                    className="form-control"
                    value={oldPassword}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Nova Senha</label>
                  <input
                    type="password"
                    name="newPassword"
                    className="form-control"
                    value={newPassword}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Confirme a Nova Senha</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    value={confirmPassword}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" onClick={onClose}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Atualizar Senha
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updatePassword }, dispatch)

export default connect(null, mapDispatchToProps)(UpdatePasswordModal)
