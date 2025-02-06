import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSummary } from "./dashboardActions";
import ContentHeader from "../common/template/contentHeader";
import Content from "../common/template/content";
import ValueBox from "../common/widget/valueBox";
import Row from "../common/layout/row";
import { Pie, Bar, Radar, Line, Doughnut } from "react-chartjs-2"; // Importando o gráfico de pizza

class Dashboard extends Component {
  componentWillMount() {
    this.props.getSummary();
  }

  render() {
    const {
      credit = 0,
      debt = 0,
      consol = 0,
      categories = [],
    } = this.props.summary;

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

    // Função para converter valores monetários em número
    const parseValue = (value) => {
      return parseFloat(value.replace(/[^\d,-]/g, "").replace(",", "."));
    };

    // Valores convertidos
    const creditValue = parseValue(credit);
    const debtValue = parseValue(debt);
    const consolValue = parseValue(consol);

    console.log("Valores de Dados:", {
      creditValue,
      debtValue,
      consolValue,
      categories,
    });

    // Dados para o gráfico de pizza
    const chartData = {
      labels: ["Créditos", "Débitos", "Consolidado"], // Labels das fatias
      datasets: [
        {
          data: [creditValue, debtValue, consolValue], // Dados das fatias
          backgroundColor: ["#00A65A", "#DD4B39", "#0073B7"], // Cores das fatias
          borderColor: ["#FFFFFF", "#FFFFFF", "#FFFFFF"], // Bordas das fatias
          borderWidth: 2,
        },
      ],
    };

    // Dados para o gráfico de pizza (Categorias de Débito)
    const categoryChartData = {
      labels: categories.map((c) => c.category), // Labels com os nomes das categorias
      datasets: [
        {
          data: categories.map((c) => parseValue(c.total)), // Valores correspondentes
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#8D6E63",
            "#4DB6AC",
            "#BA68C8",
          ], // Cores variadas
          borderColor: [
            "#FFFFFF",
            "#FFFFFF",
            "#FFFFFF",
            "#FFFFFF",
            "#FFFFFF",
            "#FFFFFF",
          ],
          borderWidth: 2,
        },
      ],
    };

    // Opções para o gráfico de pizza
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom", // Posiciona a legenda abaixo do gráfico
        },
      },
    };

    console.log("Dados do gráfico de categorias:", categoryChartData);

    return (
      <div>
        <ContentHeader title="Dashboard" small="" />
        <Content>
          <Row>
            <ValueBox
              cols="12 4"
              color="green"
              icon="link"
              value={`R$ ${credit}`}
              text="Total de Créditos"
            />
            <ValueBox
              cols="12 4"
              color="red"
              icon="chain-broken"
              value={`R$ ${debt}`}
              text="Total de Débitos"
            />
            <ValueBox
              cols="12 4"
              color="blue"
              icon="handshake-o"
              value={`R$ ${consol}`}
              text="Valor Consolidado"
            />
          </Row>
          <Row>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div style={{ flex: "1", maxWidth: "100%", height: 270 }}>
                <h4 style={{ textAlign: "center" }}>Visão Geral</h4>
                <Pie data={chartData} options={chartOptions} />
              </div>

              <div style={{ flex: "1", maxWidth: "100%", height: 270 }}>
                <h4 style={{ textAlign: "center" }}>Gastos por Categoria</h4>
                <Doughnut data={categoryChartData} options={chartOptions} />
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

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getSummary }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
