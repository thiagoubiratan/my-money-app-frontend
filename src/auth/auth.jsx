import './auth.css'

import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { login, signup } from './authActions'
import Row from '../common/layout/row'
import Grid from '../common/layout/grid'
import Messages from '../common/msg/messages'
import Input from '../common/form/inputAuth'

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = { loginMode: true, mobileBlocked: false }
    }

    componentDidMount() {
        const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            this.setState({ mobileBlocked: true });
        }
    }

    changeMode() {
        this.setState({ loginMode: !this.state.loginMode })
    }

    onSubmit(values) {
        if (this.state.mobileBlocked) return; // segurança extra
        const { login, signup } = this.props
        this.state.loginMode ? login(values) : signup(values)
    }

    render() {
        const { loginMode, mobileBlocked } = this.state
        const { handleSubmit } = this.props

        return (
            <div className="login-box">
                <div className="login-logo">
                    <i className='fa fa-bank'></i>
                    <b> ESFin</b>
                </div>

                <div className="login-box-body">
                    <p className="login-box-msg">Bem vindo!</p>

                    {mobileBlocked && (
                        <div className="alert alert-danger">
                            <i className="fa fa-warning" style={{ marginRight: 6 }}></i>
                            O acesso por dispositivos móveis não é permitido.  
                            Por favor, utilize um computador.
                        </div>
                    )}

                    <form onSubmit={handleSubmit(v => this.onSubmit(v))}>
                        <Field component={Input} type="input" name="name" placeholder="Nome" icon='user' hide={loginMode} />
                        <Field component={Input} type='email' name='email' placeholder='E-mail' icon='envelope' />
                        <Field component={Input} type="password" name="password" placeholder="Password" icon='lock' />
                        <Field component={Input} type="password" name="confirm_password" placeholder="Confirmar password" icon='lock' hide={loginMode} />

                        <Row>
                            <Grid cols="4">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block btn-flat"
                                    disabled={mobileBlocked}
                                >
                                    <i className="fa fa-sign-in" style={{ marginRight: 5 }}></i>
                                    {loginMode ? 'Entrar' : 'Registrar'}
                                </button>
                            </Grid>
                        </Row>
                    </form>

                    {!mobileBlocked && loginMode && (
                        <p style={{ marginTop: '10px' }}>
                            <a href="#/forgot-password">Esqueceu sua senha?</a>
                        </p>
                    )}

                    <Messages />
                </div>
            </div>
        )
    }
}


Auth = reduxForm({ form: 'authForm' })(Auth)
const mapDispatchToProps = dispatch => bindActionCreators({ login, signup }, dispatch)
export default connect(null, mapDispatchToProps)(Auth)
