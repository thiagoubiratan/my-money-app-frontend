import React, { Component } from 'react';

import Grid from '../common/layout/grid';
import Row from '../common/layout/row';
import ValueBox from '../common/widget/valueBox';

export default ({ credit, debt, pending, consolidateValue }) => (
    <Grid cols='12'>
        <fieldset>
            <legend>Resumo</legend>
            <Row>
                <ValueBox cols='12 6' color='green' icon='dollar'
                    value={`R$ ${credit}`} text='Total de Créditos'>
                </ValueBox>
                <ValueBox cols='12 6' color='red' icon='credit-card'
                    value={`R$ ${debt}`} text='Total de Débitos'>
                </ValueBox>
                <ValueBox cols='12 6' color='yellow' icon='balance-scale'
                    value={`R$ ${pending}`} text='Pendente Pagamento'>
                </ValueBox>
                <ValueBox cols='12 6' color='blue' icon='money'
                    value={`R$ ${consolidateValue}`} text='Valor Consolidado'>
                </ValueBox>
            </Row>
        </fieldset>
    </Grid>
)