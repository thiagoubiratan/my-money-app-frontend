import React, { Component } from 'react';

import Grid from '../common/layout/grid';
import Row from '../common/layout/row';
import ValueBox from '../common/widget/valueBox';

export default ({ credit, debt, pending, consolidateValue }) => (
    <Grid cols='12'>
        <fieldset>
            <legend>Resumo</legend>
            <Row>
                <ValueBox cols='12 6' color='green' icon='link'
                    value={`R$ ${credit || 0}`} text='Total de Créditos'>
                </ValueBox>
                <ValueBox cols='12 6' color='red' icon='chain-broken'
                    value={`R$ ${debt || 0}`} text='Total de Débitos'>
                </ValueBox>
                <ValueBox cols='12 6' color='yellow' icon='low-vision'
                    value={`R$ ${pending || 0}`} text='Pendente Pagamento'>
                </ValueBox>
                <ValueBox cols='12 6' color='blue' icon='handshake-o'
                    value={`R$ ${consolidateValue || 0}`} text='Valor Consolidado'>
                </ValueBox>
            </Row>
        </fieldset>
    </Grid>
)