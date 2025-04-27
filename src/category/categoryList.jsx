import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getList, showUpdate, showDelete } from "./categoryActions"; // importa as novas actions

class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            perPage: 10,
        };
    }

    componentDidMount() {
        this.props.getList();
    }

    renderRows() {
        const { list } = this.props;
        const { currentPage, perPage } = this.state;
        const startIndex = (currentPage - 1) * perPage;
        const endIndex = startIndex + perPage;
        const currentList = list.slice(startIndex, endIndex);

        return currentList.map((category) => (
            <tr key={category._id}>
                <td>{category.description}</td>
                <td>
                    <button
                        className="btn btn-warning"
                        onClick={() => this.props.showUpdate(category)}
                    >
                        <i className="fa fa-pencil"></i>
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => this.props.showDelete(category)}
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
                    style={{ cursor: "pointer" }}
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
                            style={{ cursor: "pointer" }}
                            onClick={() => this.setState({ currentPage: currentPage - 1 })}
                        >
                            «
                        </a>
                    </li>
                    {pages}
                    <li
                        className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                    >
                        <a
                            className="page-link"
                            style={{ cursor: "pointer" }}
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

// Mapeamento Redux
const mapStateToProps = (state) => ({
    list: state.categories.list || []
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ getList, showUpdate, showDelete }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
