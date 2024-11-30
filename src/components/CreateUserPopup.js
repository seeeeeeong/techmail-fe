import React, { useState } from 'react';
import './CreateUserPopup.css';
import { sendVerifyCode, createUser } from '../api/userApi';

const CreateUserPopup = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState('');

    const handleEmailSubmit = async () => {
        try {
            const response = await sendVerifyCode(email);
            if (response?.code === 200) {
                setStep(2);
            } else {
                setMessage(response?.message || '😕 이메일 발송에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            setMessage('🚫 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    const handleCodeSubmit = async () => {
        try {
            const response = await createUser({ email, code, category: 'BACKEND' });
            if (response?.code === 200) {
                setStep(3);
            } else {
                setMessage(response?.message || '❌ 인증에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('Error verifying code:', error);
            setMessage('🚫 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h2 className="popup-title">Tech Mail에 오신 것을 환영합니다 🚀</h2>
                {step === 1 && (
                    <div className="step-content">
                        <p className="step-description">시작하려면 이메일을 입력해주세요.</p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="input-field"
                        />
                    </div>
                )}
                {step === 2 && (
                    <div className="step-content">
                        <p className="step-description">✉️ 인증번호가 발송되었습니다. 이메일을 확인해주세요.</p>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="0000"
                            className="input-field"
                            maxLength="4"
                        />
                    </div>
                )}
                {step === 3 && (
                    <div className="welcome-message">
                        <h3 className="welcome-title">🎉 Tech Mail 가입을 축하합니다!</h3>
                        <p className="welcome-description">개발자 여러분을 위한 특별한 여정이 시작됩니다.</p>
                    </div>
                )}
                {message && <p className="message">{message}</p>}
                <div className="button-group">
                    {step !== 3 && (
                        <button onClick={step === 1 ? handleEmailSubmit : handleCodeSubmit} className="submit-button">
                            {step === 1 ? '시작하기' : '인증하기'}
                        </button>
                    )}
                    <button onClick={onClose} className="close-button">
                        {step === 3 ? '시작하기' : '닫기'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateUserPopup;

