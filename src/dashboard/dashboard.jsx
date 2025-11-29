import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSummary } from "./dashboardActions";
import ContentHeader from "../common/template/contentHeader";
import Content from "../common/template/content";
import ValueBox from "../common/widget/valueBox";
import Row from "../common/layout/row";
import { Pie, Doughnut } from "react-chartjs-2";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    const today = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const start = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-01`;
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const end = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(lastDay.getDate())}`;
    this.state = { startDate: start, endDate: end };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.setPreset = this.setPreset.bind(this);
  }

  componentWillMount() {
    this.props.getSummary(this.state.startDate, this.state.endDate);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSearch() {
    const { startDate, endDate } = this.state;
    this.props.getSummary(startDate, endDate);
  }

  clearFilters() {
    this.setState({ startDate: "", endDate: "" });
    this.props.getSummary();
  }

  setPreset(type) {
    const today = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const toInput = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

    let start = null;
    let end = null;

    if (type === 'current') {
      start = new Date(today.getFullYear(), today.getMonth(), 1);
      end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    } else if (type === 'previous') {
      const prev = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      start = new Date(prev.getFullYear(), prev.getMonth(), 1);
      end = new Date(prev.getFullYear(), prev.getMonth() + 1, 0);
    } else if (type === '3months') {
      const firstDay = new Date(today.getFullYear(), today.getMonth() - 2, 1);
      start = firstDay;
      end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    } else if (type === '5months') {
      const firstDay = new Date(today.getFullYear(), today.getMonth() - 4, 1);
      start = firstDay;
      end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    } else if (type === 'year') {
      const firstDay = new Date(today.getFullYear(), today.getMonth() - 11, 1);
      start = firstDay;
      end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    }

    const startStr = start ? toInput(start) : '';
    const endStr = end ? toInput(end) : '';
    this.setState({ startDate: startStr, endDate: endStr });
    // dispara a busca imediatamente com os filtros selecionados
    this.props.getSummary(startStr || undefined, endStr || undefined);
  }

  render() {
    const { credit = 0, debt = 0, consol = 0, categories = [], periodStart = null, periodEnd = null } = this.props.summary;

    if (!credit && !debt && !consol) {
      return (
        <div>
          <ContentHeader title=" Dashboard" small="Versão 2024.09.30" icon="dashboard"
          />

          <Content>
            <div>Carregando...</div>
          </Content>
        </div>
      );
    }

    const parseValue = (value) => parseFloat(value.replace(/[^\d,-]/g, "").replace(",", "."));

    const creditValue = parseValue(credit);
    const debtValue = parseValue(debt);
    const consolValue = parseValue(consol);

    const chartData = {
      labels: ["Créditos", "Débitos", "Consolidado"],
      datasets: [
        {
          data: [creditValue, debtValue, consolValue],
          backgroundColor: ["#00A65A", "#DD4B39", "#0073B7"],
          borderColor: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
          borderWidth: 2,
        },
      ],
    };

    const categoryChartData = {
      labels: categories.map((c) => c.category),
      datasets: [
        {
          data: categories.map((c) => parseValue(c.total)),
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
            '#E57373', '#7986CB', '#4DD0E1', '#A1887F', '#F06292', '#BA68C8',
            '#FFD54F', '#81C784', '#90A4AE', '#F44336', '#2196F3', '#009688'
          ],
          borderColor: [
            '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF',
            '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF',
            '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'
          ],
          borderWidth: 2,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    };

    const periodLabel = periodStart || periodEnd ? `${periodStart || ''}${periodStart && periodEnd ? ' - ' : ''}${periodEnd || ''}` : '';

    return (
      <div>
        <ContentHeader title=" Dashboard" small={periodLabel} icon="dashboard"/>
        <Content>
          <Row>
            <div className="col-xs-12">
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">Filtros</h3>
                  <small style={{ marginLeft: 10, color: '#777' }}>Selecione um período (opcional) ou use presets rápidos</small>
                </div>
                <div className="box-body">
                  <div className="row" style={{ marginBottom: 10 }}>
                    <div className="col-xs-12">
                      <div className="btn-group" role="group">
                        <button className="btn btn-default" onClick={() => this.setPreset('current')} style={{ marginRight: 6 }}>Mês Atual</button>
                        <button className="btn btn-default" onClick={() => this.setPreset('previous')} style={{ marginRight: 6 }}>Mês Anterior</button>
                        <button className="btn btn-default" onClick={() => this.setPreset('3months')} style={{ marginRight: 6 }}>Últimos 3 meses</button>
                        <button className="btn btn-default" onClick={() => this.setPreset('5months')} style={{ marginRight: 6 }}>Últimos 5 meses</button>
                        <button className="btn btn-default" onClick={() => this.setPreset('year')}>Último ano</button>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 col-sm-6">
                      <div className="form-group">
                        <label>Data Início</label>
                        <input
                          type="date"
                          name="startDate"
                          className="form-control"
                          value={this.state.startDate}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                      <div className="form-group">
                        <label>Data Fim</label>
                        <input
                          type="date"
                          name="endDate"
                          className="form-control"
                          value={this.state.endDate}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row" style={{ marginTop: 6 }}>
                    <div className="col-xs-12">
                      <button className="btn btn-primary" onClick={this.handleSearch} disabled={this.state.startDate && this.state.endDate && (new Date(this.state.startDate) > new Date(this.state.endDate))} style={{ marginRight: 6 }}>
                        <i className="fa fa-search" style={{ marginRight: 5 }}></i>
                        Pesquisar
                      </button>
                      <button className="btn btn-default" onClick={this.clearFilters}>
                        <i className="fa fa-trash-o" style={{ marginRight: 5 }}></i>
                        Limpar
                      </button>
                      {this.state.startDate && this.state.endDate && (new Date(this.state.startDate) > new Date(this.state.endDate)) && (
                        <div style={{ color: '#a94442', marginTop: 8 }}>Data Início não pode ser posterior à Data Fim.</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
          <Row>
            <ValueBox cols='12 4' color='green' icon='link'
              value={`R$ ${credit}`} text='Total de Créditos' />
            <ValueBox cols='12 4' color='red' icon='chain-broken'
              value={`R$ ${debt}`} text='Total de Débitos' />
            <ValueBox cols='12 4' color='blue' icon='handshake-o'
              value={`R$ ${consol}`} text='Valor Consolidado' />
          </Row>

          <Row>
            {/* Gráfico de Visão Geral */}
            <div className="col-lg-6 col-xs-12">
              <div className="box">
                <div className="box-header with-border">
                  <h3 className="box-title">Visão Geral</h3>
                </div>
                <div className="box-body" style={{ height: "300px" }}>
                  <Pie data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>

            {/* Gráfico de Gastos por Categoria */}
            <div className="col-lg-6 col-xs-12">
              <div className="box">
                <div className="box-header with-border">
                  <h3 className="box-title">Gastos por Categoria</h3>
                </div>
                <div className="box-body" style={{ height: "300px" }}>
                  <Doughnut data={categoryChartData} options={chartOptions} />
                </div>
              </div>
            </div>
          </Row>
        </Content>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  summary: state.dashboard.summary,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ getSummary }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
