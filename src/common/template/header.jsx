import React from 'react';
import NavBar from './navBar';

export default props => (
    <header className='main-header'>
        <a href='/#/' className='logo'>
            <span className='logo-mini'><b>G</b>360</span>
            <span className='logo-lg'>
                <i className='fa fa-balance-scale'></i>
                <b> Meu Dinheiro</b> 360
            </span>
        </a>
        <nav className='navbar navbar-static-top'>
            <a href className='sidebar-toggle' data-toggle='offcanvas'></a>
            <NavBar></NavBar>
        </nav>
    </header>
)