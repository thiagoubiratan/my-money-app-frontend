import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSummary } from './dashboardActions';
import ContentHeader from '../common/template/contentHeader';
import Content from '../common/template/content';
import ValueBox from '../common/widget/valueBox';
import Row from '../common/layout/row';
import { Pie } from 'react-chartjs-2';  // Importando o gráfico de pizza

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

        // Dados para o gráfico de pizza
        const chartData = {
            labels: ['Créditos', 'Débitos', 'Consolidado'], // Labels das fatias
            datasets: [{
                data: [creditValue, debtValue, consolValue], // Dados das fatias
                backgroundColor: ['#00A65A', '#DD4B39', '#0073B7'], // Cores das fatias
                borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // Bordas das fatias
                borderWidth: 2,
            }]
        };

        // Opções para o gráfico de pizza
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom', // Posiciona a legenda abaixo do gráfico
                }
            }
        };

        console.log("Dados do gráfico:", chartData);

        return (
            <div>
                <ContentHeader title="Dashboard" small="Versão 2025.01.31" />
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
                        {/* Gráfico de Pizza */}
                        <div style={{ height: 300, width: '100%', margin: '10px auto 0' }}>
                            <Pie data={chartData} options={chartOptions} />
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
