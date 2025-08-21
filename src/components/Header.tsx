import React from 'react';
import config from '../config';

const Header: React.FC = () => {
    return (
        <header>
            <div style={{
                fontWeight: 'bold',
                fontSize: '20px',
                letterSpacing: '10px'
            }}>
                {config.title}
            </div>
        </header>
    );
};

export default Header;