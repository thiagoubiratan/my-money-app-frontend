import React from 'react';
import MenuItem from './menuItem'
import MenuTree from './menuTree'

export default props => (
    <ul className='sidebar-menu'>
        <MenuItem path="/" label="Dashboard" icon="dashboard"></MenuItem>
        <MenuTree label='Cadastro' icon="edit">
            <MenuItem path='categories' label='Categorias' icon='tags'></MenuItem>
            <MenuItem path='billingCycles' label='Ciclos de Pagamentos' icon='gg'></MenuItem>
        </MenuTree>
        <MenuItem path='donation' label='Doação' icon='gift'></MenuItem>
    </ul >
)