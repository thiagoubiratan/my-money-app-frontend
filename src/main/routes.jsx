import React from 'react';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';

import authOrApp from './authOrApp';
import Dashboard from '../dashboard/dashboard'
import BillingCycle from '../billingCycle/billingCycle'
import Category from '../category/category'

export default props => (
    <Router history={hashHistory}>
        <Route path='/' component={authOrApp}>
            <IndexRoute component={Dashboard}></IndexRoute>
            <Route path='billingCycles' component={BillingCycle} />
            <Route path='categories' component={Category} />
        </Route>
        <Redirect from='*' to='/' />
    </Router>
)