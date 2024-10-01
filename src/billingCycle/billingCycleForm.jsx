import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { init } from './billingCycleActions';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import labelAndInput from '../common/form/labelAndInput';
import ItemList from './itemList';
import Summary from './summary';

class BillingCycleForm extends Component {
    
    render() {
        const { handleSubmit, readOnly, credits, debts, billingCycle } = this.props;

        // Pegando os valores diretamente do ciclo de pagamento retornado pela API
        const sumOfCredits = billingCycle.totalCredits || '0,00';
        const sumOfDebts = billingCycle.totalDebits || '0,00';
        const sumOfPendingDebts = billingCycle.pending || '0,00';
        const sumOfConsolidatedValue = billingCycle.consol || '0,00';

        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='name' component={labelAndInput} readOnly={readOnly}
                        label='Nome' cols='12 4' placeholder='Informe o nome'></Field>
                    <Field name='month' component={labelAndInput} readOnly={readOnly}
                        label='Mês' cols='12 4' placeholder='Informe o mês'></Field>
                    <Field name='year' component={labelAndInput} readOnly={readOnly}
                        label='Ano' cols='12 4' placeholder='Informe o ano'></Field>

                    {/* Passando os valores diretamente para o componente Summary */}
                    <Summary 
                        credit={sumOfCredits} 
                        debt={sumOfDebts} 
                        pending={sumOfPendingDebts} 
                        consolidateValue={sumOfConsolidatedValue}
                    ></Summary>

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
            </form>
        );
    }
}

BillingCycleForm = reduxForm({ form: 'billingCycleFrom', destroyOnUnmount: false })(BillingCycleForm);

// Supondo que o ciclo de pagamento é retornado nas props como billingCycle
const selector = formValueSelector('billingCycleFrom');
const mapStateToProps = state => ({
    credits: selector(state, 'credits'),
    debts: selector(state, 'debts'),
    billingCycle: state.billingCycle.list[0] || {} // Pegando o primeiro ciclo retornado
});

const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm);
