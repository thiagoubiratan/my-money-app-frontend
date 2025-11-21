import React from 'react';
import ContentHeader from './contentHeader';
import Content from './content';

export default () => (
    <div className='wrapper' style={{ height: '100vh', backgroundColor: '#ecf0f5' }}>
        <ContentHeader title="Acesso Restrito" small="Dispositivo não suportado" />
        <Content>
            <div className="callout callout-danger">
                <h4><i className="icon fa fa-ban"></i> Acesso Bloqueado</h4>
                <p>Este sistema foi projetado para ser utilizado em um computador. O acesso por dispositivos móveis não é suportado para garantir a melhor experiência e funcionalidade.</p>
                <p>Por favor, acesse através de um desktop ou notebook.</p>
            </div>
        </Content>
    </div>
);