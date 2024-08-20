import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { init } from './billingCycleActions'
import { reduxForm, Field, formValueSelector } from 'redux-form';
import labelAndInput from '../common/form/labelAndInput';
import ItemList from './itemList';
import Summary from './summary';

class BillingCycleFrom extends Component {

    calculateSumary() {
        const sum = (t, v) => t + v
        const pendingDebts = this.props.debts.filter(debt => debt.status === 'PENDENTE');
        
        let sumCredits = this.props.credits.map(c => +c.value || 0).reduce(sum);
        let sumDebts = this.props.debts.map(c => +c.value || 0).reduce(sum);
        let pendingDebtsSum = 0;
        let consolidatedValue = sumCredits - sumDebts

        if (pendingDebts.length > 0) {
            pendingDebtsSum = pendingDebts.map(debt => +debt.value || 0).reduce(sum);
        }

        return {
            sumOfCredits: sumCredits.toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
            sumOfDebts: sumDebts.toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
            sumOfPendingDebts: pendingDebtsSum.toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
            sumOfConsolidatedValue: consolidatedValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
        }
    }

    render() {
        const { handleSubmit, readOnly, credits, debts } = this.props;
        const { sumOfCredits, sumOfDebts, sumOfPendingDebts, sumOfConsolidatedValue } = this.calculateSumary();

        return (
            <form role='from' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='name' component={labelAndInput} readOnly={readOnly}
                        label='Nome' cols='12 4' placeholder='Informe o nome'></Field>
                    <Field name='month' component={labelAndInput} readOnly={readOnly}
                        label='Mês' cols='12 4' placeholder='Informe o mês'></Field>
                    <Field name='year' component={labelAndInput} readOnly={readOnly}
                        label='Ano' cols='12 4' placeholder='Informe o ano'></Field>

                    <Summary credit={sumOfCredits} debt={sumOfDebts} pending={sumOfPendingDebts} consolidateValue={sumOfConsolidatedValue}></Summary>

                    <ItemList cols='12 12' list={credits} readOnly={readOnly}
                        field='credits' legend='Créditos' />
                    <ItemList cols='12 12' list={debts} readOnly={readOnly}
                        field='debts' legend='Débitos' showStatus={true} />
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className='btn btn-default' onClick={this.props.init}>Cancelar</button>
                </div>
            </form >
        )
    }
}

BillingCycleFrom = reduxForm({ form: 'billingCycleFrom', destroyOnUnmount: false })(BillingCycleFrom)
const selector = formValueSelector('billingCycleFrom')
const mapStateToProps = state => ({
    credits: selector(state, 'credits'),
    debts: selector(state, 'debts')
})
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleFrom)