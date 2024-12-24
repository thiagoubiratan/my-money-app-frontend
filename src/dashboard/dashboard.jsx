import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSummary } from './dashboardActions';
import ContentHeader from '../common/template/contentHeader';
import Content from '../common/template/content';
import ValueBox from '../common/widget/valueBox';
import Row from '../common/layout/row';
import { Bar } from 'react-chartjs-2';  // Importando o gráfico de barras

class Dashboard extends Component {

    componentWillMount() {
        this.props.getSummary();
    }

    render() {
        const { credit = 0, debt = 0, consol = 0 } = this.props.summary;

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
            return parseFloat(value.replace(/[^\d,-]/g, '').replace(',', '.'));
        };

        // Valores convertidos
        const creditValue = parseValue(credit);
        const debtValue = parseValue(debt);
        const consolValue = parseValue(consol);

        console.log("Valores de Dados:", { creditValue, debtValue, consolValue });

        // Dados para o gráfico de barras
        const chartData = {
            labels: ['Créditos', 'Débitos', 'Consolidado'],  // Labels das barras
            datasets: [{
                label: 'Valores',
                data: [creditValue, debtValue, consolValue],  // Dados das barras
                backgroundColor: ['#00A65A', '#DD4B39', '#0073B7'],  // Cor das barras (verde alterado para #00A65A)
                borderColor: ['darkgreen', 'darkred', 'darkblue'],  // Cor da borda das barras
                borderWidth: 1,  // Largura da borda das barras
            }]
        };

        // Opções para o gráfico de barras
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true, // Garantir que a escala Y comece do zero
                },
            },
        };

        console.log("Dados do gráfico:", chartData);

        return (
            <div>
                <ContentHeader title="Dashboard" small="Versão 2024.09.30" />
                <Content>
                    <Row>
                        <ValueBox
                            cols="12 4"
                            color="green"
                            icon="bank"
                            value={`R$ ${credit}`}
                            text="Total de Créditos"
                        />
                        <ValueBox
                            cols="12 4"
                            color="red"
                            icon="credit-card"
                            value={`R$ ${debt}`}
                            text="Total de Débitos"
                        />
                        <ValueBox
                            cols="12 4"
                            color="blue"
                            icon="money"
                            value={`R$ ${consol}`}
                            text="Valor Consolidado"
                        />
                    </Row>
                    <Row>
                        {/* Gráfico de Barras */}
                        <div style={{ height: 500, width: '100%', margin: '0 auto' }}>
                            <Bar data={chartData} options={chartOptions} />
                        </div>
                    </Row>
                </Content>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    summary: state.dashboard.summary,
});

const mapDispatchToProps = dispatch => bindActionCreators({ getSummary }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
