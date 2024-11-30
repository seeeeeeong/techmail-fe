import React, { useState } from 'react';
import Header from './Header';
import CreateUserPopup from './CreateUserPopup';
import './MainPage.css';

const MainPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="main-page">
            <Header onSignUpClick={openModal} />
            <main className="main-content">
                <h1 className="main-title">
                    개발 관련 정보를 <br />
                    메일로 보내드릴게요
                </h1>
                <button className="subscribe-button" onClick={openModal}>
                    이메일로 시작하기
                </button>
                <div className="mail-illustration">
                    <div className="mail-icon">✉️</div>
                </div>
            </main>
            {isModalOpen && <CreateUserPopup onClose={closeModal} />}
        </div>
    );
};

export default MainPage;

