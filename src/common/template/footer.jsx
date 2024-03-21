import React from 'react';

export default props => {
    const anoAtual = new Date().getFullYear();

    return (
        <footer className='main-footer'>
            <strong>
                Copyright &copy; {anoAtual}
                <a href='#' target='_blank'> My Money APP</a>.
            </strong>
        </footer>
    );
}
