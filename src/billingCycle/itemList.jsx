import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, arrayInsert, arrayRemove } from 'redux-form';
import Grid from '../common/layout/grid';
import Input from '../common/form/input';
import If from '../common/operador/if';

function formatCurrency(value) {
    if (!value) return '';
    
    // Remove qualquer caractere que não seja número ou vírgula
    let formattedValue = value.replace(/\D/g, '');
    
    // Converte o valor para um número float e divide por 100 para obter as duas casas decimais
    const floatValue = parseFloat(formattedValue) / 100;

    // Aplica a formatação para BRL sem o símbolo "R$"
    return floatValue
        .toFixed(2) // Define sempre duas casas decimais
        .replace('.', ',') // Troca o ponto por vírgula
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Adiciona os pontos como separadores de milhar
}


// Componente de Select customizado
const renderSelectField = ({ input, meta: { touched, error }, children, ...custom }) => (
    <div>
        <select {...input} {...custom} className="form-control">
            {children}
        </select>
        {touched && error && <span className="error">{error}</span>}
    </div>
);

// Componente de Input para Datas
const renderDateField = ({ input, meta: { touched, error }, ...custom }) => (
    <div>
        <input 
            {...input}
            type="date" 
            className="form-control"
            {...custom}
            value={input.value ? input.value.split('T')[0] : ''} // Formatar para YYYY-MM-DD
        />
        {touched && error && <span className="error">{error}</span>}
    </div>
);

// Componente de Input para Números
const renderNumbeField = ({ input, meta: { touched, error }, ...custom }) => (
    <div>
        <input 
            {...input}
            type="number" 
            className="form-control"
            {...custom}
            value={input.value}
        />
        {touched && error && <span className="error">{error}</span>}
    </div>
);

const renderCurrencyField = ({ input, meta: { touched, error }, readOnly }) => (
    <div>
        <input
            {...input}
            className="form-control"
            readOnly={readOnly}
            value={formatCurrency(input.value)} // Formata o valor ao renderizar
            onChange={(e) => {
                const formattedValue = formatCurrency(e.target.value); // Aplica a máscara conforme o usuário digita
                input.onChange(formattedValue.replace(/\./g, '').replace(',', '.')); // Remove os separadores para o valor real
            }}
            placeholder="Informe o valor"
        />
        {touched && error && <span className="error">{error}</span>}
    </div>
);


class ItemList extends Component {
    add(index, item = {}) {
        if (!this.props.readOnly) {
            this.props.arrayInsert('billingCycleForm', this.props.field, index, item)
        }
    }

    remove(index) {
        if (!this.props.readOnly && this.props.list.length > 1) {
            this.props.arrayRemove('billingCycleForm', this.props.field, index)
        }
    }

    renderRows() {
        const list = this.props.list || [];
        return list.map((item, index) => (
            <tr key={index}>
                <td>
                    <Field
                        name={`${this.props.field}[${index}].name`}
                        component={Input}
                        placeholder="Informe o nome"
                        readOnly={this.props.readOnly}
                    />
                </td>
                <td>
                    <Field
                        name={`${this.props.field}[${index}].value`}
                        component={renderCurrencyField}
                        placeholder="Informe o valor"
                        readOnly={this.props.readOnly}
                    />
                </td>
                <If test={this.props.showStatus}>
                    <td>
                        <Field
                            name={`${this.props.field}[${index}].paymentday`}
                            component={renderNumbeField}
                            placeholder="Informe o valor"
                            readOnly={this.props.readOnly}
                        />
                    </td>
                </If>
                <If test={this.props.showStatus}>
                    <td>
                        <Field
                            name={`${this.props.field}[${index}].paymentDate`}
                            component={renderDateField} // Usando o novo componente de data
                            placeholder="Informe a data"
                            readOnly={this.props.readOnly}
                        />
                    </td>
                </If>
                <If test={this.props.showStatus}>
                    <td>
                        <Field
                            name={`${this.props.field}[${index}].status`}
                            component={renderSelectField}
                            readOnly={this.props.readOnly}
                        >
                            <option value="">Selecione o status</option>
                            <option value="PAGO">PAGO</option>
                            <option value="PENDENTE">PENDENTE</option>
                            <option value="AGENDADO">AGENDADO</option>
                        </Field>
                    </td>
                </If>
                <td>
                    <button type="button" className="btn btn-success" onClick={() => this.add(index + 1)}>
                        <i className="fa fa-plus"></i>
                    </button>
                    <button type="button" className="btn btn-warning" onClick={() => this.add(index + 1, item)}>
                        <i className="fa fa-clone"></i>
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => this.remove(index)}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </td>
            </tr>
        ));
    }

    render() {
        return (
            <Grid cols={this.props.cols}>
                <fieldset>
                    <legend>{this.props.legend}</legend>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Valor</th>
                                <If test={this.props.showStatus}>
                                    <th>Dia do vencimento</th>
                                </If>
                                <If test={this.props.showStatus}>
                                    <th>Data do pagamento</th>
                                </If>
                                <If test={this.props.showStatus}>
                                    <th>Status</th>
                                </If>
                                <th className='table-actions'>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                </fieldset>
            </Grid>
        );
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({ arrayInsert, arrayRemove }, dispatch);
export default connect(null, mapDispatchToProps)(ItemList);