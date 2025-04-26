import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getList } from "./categoryActions";

class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            perPage: 10, // Defina o número de registros por página conforme necessário
        };
        this.handleCopy = this.handleCopy.bind(this); // Bind manual para o método
    }

    componentDidMount() {
        this.props.getList();
    }

    handleCopy(billingCycleId) {
        const { copyBillingCycle } = this.props;
        if (billingCycleId) {
            copyBillingCycle(billingCycleId); // Chama a ação para copiar o ciclo de pagamento
        } else {
            console.error("ID do ciclo de pagamento não encontrado.");
        }
    }

    renderRows() {
        const { list } = this.props;
        const { currentPage, perPage } = this.state;
        const startIndex = (currentPage - 1) * perPage;
        const endIndex = startIndex + perPage;
        const currentList = list.slice(startIndex, endIndex);

        return currentList.map((x) => (
            <tr key={x._id}>
                <td>{x.description}</td>
                <td>
                    <button
                        className="btn btn-warning"
                        onClick={() => this.props.showUpdate(x)}
                    >
                        <i className="fa fa-pencil"></i>
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => this.props.showDelete(x)}
                    >
                        <i className="fa fa-trash-o"></i>
                    </button>
                </td>
            </tr>
        ));
    }

    renderPagination() {
        const { list } = this.props;
        const { currentPage, perPage } = this.state;
        const totalPages = Math.ceil(list.length / perPage);
        const pages = Array.from(Array(totalPages).keys()).map((page) => (
            <li
                key={page + 1}
                className={`page-item ${currentPage === page + 1 ? "active" : ""}`}
            >
                <a
                    className="page-link"
                    style={{ cursor: "pointer" }} // Estilo inline aqui
                    onClick={() => this.setState({ currentPage: page + 1 })}
                >
                    {page + 1}
                </a>
            </li>
        ));

        return (
            <div className="card-footer clearfix">
                <ul className="pagination pagination-sm m-0 float-right">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <a
                            className="page-link"
                            style={{ cursor: "pointer" }} // Estilo inline aqui
                            onClick={() => this.setState({ currentPage: currentPage - 1 })}
                        >
                            «
                        </a>
                    </li>
                    {pages}
                    <li
                        className={`page-item ${currentPage === totalPages ? "disabled" : ""
                            }`}
                    >
                        <a
                            className="page-link"
                            style={{ cursor: "pointer" }} // Estilo inline aqui
                            onClick={() => this.setState({ currentPage: currentPage + 1 })}
                        >
                            »
                        </a>
                    </li>
                </ul>
            </div>
        );
    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th className="table-actions">Ações</th>
                        </tr>
                    </thead>
                    <tbody>{this.renderRows()}</tbody>
                </table>
                {this.renderPagination()}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    list: state.categories.list || [],
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ getList }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
