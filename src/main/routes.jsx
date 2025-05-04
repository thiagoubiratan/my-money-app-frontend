import React from 'react';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';

import authOrApp from './authOrApp';
import Dashboard from '../dashboard/dashboard'
import BillingCycle from '../billingCycle/billingCycle'
import Category from '../category/category'
import ForgotPassword from '../auth/forgot-password'
import ResetPassword from '../auth/reset-password'


export default props => (
    <Router history={hashHistory}>
        {/* ROTA DE RECUPERAÇÃO — fora da rota protegida */}
        <Route path='/forgot-password' component={ForgotPassword} />
        <Route path="reset-password/:token" component={ResetPassword} />

        {/* ROTAS PROTEGIDAS */}
        <Route path='/' component={authOrApp}>
            <IndexRoute component={Dashboard} />
            <Route path='billingCycles' component={BillingCycle} />
            <Route path='categories' component={Category} />
        </Route>

        <Redirect from='*' to='/' />
    </Router>
)
