import React from 'react';
import './Header.css';

const Header = ({ onSignUpClick }) => {
    return (
        <header className="header">
            <div className="header-content">
                <button className="home-button">
                    <span className="logo-icon">✉️</span>
                    Tech Mail
                </button>
                <div className="header-right">
                </div>
            </div>
        </header>
    );
};

export default Header;

