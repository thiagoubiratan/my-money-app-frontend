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

    return (
      <div>
        <ContentHeader title="Dashboard" small="" />
        <Content>
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
