import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { init } from './categoryActions';
import labelAndInput from '../common/form/labelAndInput';

class CategoryForm extends Component {
    render() {
        const { handleSubmit, readOnly } = this.props;

        return (
            <form role="form" onSubmit={handleSubmit}>
                <div className="box-body">
                    <Field
                        name="description"
                        component={labelAndInput}
                        readOnly={readOnly}
                        label="Descrição"
                        cols="12 6"
                        placeholder="Informe a descrição da categoria"
                    />
                </div>
                <div className="box-footer">
                    <button type="submit" className={`btn btn-${this.props.submitClass}`}>
                        <i className="fa fa-save" style={{ marginRight: 5 }}></i>
                        {this.props.submitLabel}
                    </button>
                    <button type="button" className="btn btn-warning" onClick={this.props.init}>
                        <i className="fa fa-ban" style={{ marginRight: 5 }}></i>
                        Cancelar
                    </button>
                </div>
            </form>
        );
    }
}

// Conecta o redux-form
CategoryForm = reduxForm({ form: 'categoryForm', destroyOnUnmount: false })(CategoryForm);

// Pega valores do form se precisar (hoje só descrição e id)
const selector = formValueSelector('categoryForm');
const mapStateToProps = state => ({
    categoryId: selector(state, '_id'),
    description: selector(state, 'description')
});

const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);
