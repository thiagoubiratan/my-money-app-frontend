import React from 'react';
import './loading.css';

const Loading = () => (
    <div className="loading-overlay">
        <div className="loading-spinner"></div>
        <p>Carregando...</p>
    </div>
);

export default Loading;