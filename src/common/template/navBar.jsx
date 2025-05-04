import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logout } from '../../auth/authActions'
import UpdatePasswordModal from '../../auth/UpdatePasswordModal'; // caminho correto


class Navbar extends Component {

  constructor(props) {
    super(props)
    this.state = { open: false, showPasswordModal: false }
  }

  changeOpen() {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { name, email } = this.props.user;

    const modal = this.state.showPasswordModal && (
      <UpdatePasswordModal
        email={email}
        onClose={() => this.setState({ showPasswordModal: false })}
      />
    );

    return (
      <div className="navbar-custom-menu">
        <ul className="nav navbar-nav">
          <li onMouseLeave={() => this.changeOpen()} className={`dropdown user user-menu ${this.state.open ? 'open' : ''}`}>
            <a href="javascript:;" onClick={() => this.changeOpen()} aria-expanded={this.state.open ? 'true' : 'false'} className="dropdown-toggle" data-toggle="dropdown">
              <img src="data:image/jpeg;base64,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" className="user-image" alt="User Image" />
              <span className="hidden-xs">{name}</span>
            </a>
            <ul className="dropdown-menu">
              <li className="user-header">
                <img src="data:image/jpeg;base64,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" className="img-circle" alt="User" />
                <p>{name}<small>{email}</small></p>
              </li>
              <li className="user-footer">
                <div className="pull-left">
                  <a href="javascript:;" onClick={() => this.setState({ showPasswordModal: true })} className="btn btn-default btn-flat">
                    Alterar Senha
                  </a>
                </div>
                <div className="pull-right">
                  <a href="#" onClick={this.props.logout} className="btn btn-default btn-flat">Sair</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
        {modal}
      </div>
    );
  }

}

const mapStateToProps = state => ({ user: state.auth.user })
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)