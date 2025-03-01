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
  componentWillMount() {
    this.props.getSummary();
  }

  render() {
    const { credit = 0, debt = 0, consol = 0, categories = [] } = this.props.summary;

    if (!credit && !debt && !consol) {
      return (
        <div>
          <ContentHeader title="Dashboard" small="Versão 2024.09.30" />
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
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8D6E63", "#4DB6AC", "#BA68C8"],
          borderColor: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
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

    return (
      <div>
        <ContentHeader title="Dashboard" small="" />
        <Content>
          <Row>
            {/* Caixas no estilo AdminLTE */}
            <div className="col-lg-4 col-xs-12">
              <div className="box bg-green">
                <div className="box-header with-border">
                  <h3 className="box-title">Total de Créditos</h3>
                </div>
                <div className="box-body">
                  <h4><i className="fa fa-link"></i> R$ {credit}</h4>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-xs-12">
              <div className="box bg-red">
                <div className="box-header with-border">
                  <h3 className="box-title">Total de Débitos</h3>
                </div>
                <div className="box-body">
                  <h4><i className="fa fa-chain-broken"></i> R$ {debt}</h4>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-xs-12">
              <div className="box bg-blue">
                <div className="box-header with-border">
                  <h3 className="box-title">Valor Consolidado</h3>
                </div>
                <div className="box-body">
                  <h4><i className="fa fa-handshake-o"></i> R$ {consol}</h4>
                </div>
              </div>
            </div>
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
