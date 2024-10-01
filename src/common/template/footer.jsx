import React from 'react';

export default props => {
    const anoAtual = new Date().getFullYear();

    return (
        <footer className='main-footer'>
            <strong>
                &copy; {anoAtual}
                <a href='#' target='_blank'> Meu Dinheiro</a>.
            </strong>
        </footer>
    );
}
