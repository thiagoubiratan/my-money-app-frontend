import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { init, copyBillingCycle } from './billingCycleActions'; // Ação copyBillingCycle
import { reduxForm, Field, formValueSelector } from 'redux-form';
import labelAndInput from '../common/form/labelAndInput';
import ItemList from './itemList';
import Summary from './summary';

class BillingCycleForm extends Component {
    constructor(props) {
        super(props);
        this.handleCopy = this.handleCopy.bind(this); // Bind manual para o método
    }

    handleCopy() {
        const { billingCycleId, copyBillingCycle } = this.props;
        if (billingCycleId) {
            copyBillingCycle(billingCycleId); // Chama a ação para copiar o ciclo de pagamento
        } else {
            console.error('ID do ciclo de pagamento não encontrado.');
        }
    }

    render() {
        const { handleSubmit, readOnly, credits, debts, summaryCredits, summaryDebts, summaryPending, summaryConsol, billingCycleId } = this.props;

        // Mostrar o botão de cópia somente se billingCycleId existir e o formulário não for somente leitura
        const showCopyButton = billingCycleId && !readOnly;

        return (
            <form role="form" onSubmit={handleSubmit}>
                <div className="box-body">
                    <Field name="name" component={labelAndInput} readOnly={readOnly} label="Nome" cols="12 4" placeholder="Informe o nome" />
                    <Field name="month" component={labelAndInput} readOnly={readOnly} label="Mês" cols="12 4" placeholder="Informe o mês" />
                    <Field name="year" component={labelAndInput} readOnly={readOnly} label="Ano" cols="12 4" placeholder="Informe o ano" />

                    <Summary credit={summaryCredits} debt={summaryDebts} pending={summaryPending} consolidateValue={summaryConsol} />

                    <ItemList cols="12 12" list={credits} readOnly={readOnly} field="credits" legend="Créditos" />
                    <ItemList cols="12 12" list={debts} readOnly={readOnly} field="debts" legend="Débitos" showStatus={true} />
                </div>
                <div className="box-footer">
                    <button type="submit" className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type="button" className="btn btn-warning" onClick={this.props.init}>
                        Cancelar
                    </button>
                    
                    {/* Condicional para mostrar o botão de cópia */}
                    {showCopyButton && (
                        <button type="button" className="btn btn-default" onClick={this.handleCopy}>
                            Fazer cópia
                        </button>
                    )}
                </div>
            </form>
        );
    }
}

// Configuração do Redux-Form
BillingCycleForm = reduxForm({ form: 'billingCycleForm', destroyOnUnmount: false })(BillingCycleForm);

// Configuração do Redux
const selector = formValueSelector('billingCycleForm');
const mapStateToProps = state => ({
    billingCycleId: selector(state, '_id'), // Supondo que o ciclo de pagamento tenha um campo ID
    credits: selector(state, 'credits'),
    debts: selector(state, 'debts'),
    summaryCredits: selector(state, 'totalCredits'),
    summaryDebts: selector(state, 'totalDebits'),
    summaryPending: selector(state, 'pending'),
    summaryConsol: selector(state, 'consol'),
});

const mapDispatchToProps = dispatch => bindActionCreators({ init, copyBillingCycle }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm);
