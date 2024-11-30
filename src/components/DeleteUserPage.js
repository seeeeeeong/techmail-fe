import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './DeleteUserPage.css';

const DeleteUserPage = () => {
    const location = useLocation();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const email = new URLSearchParams(location.search).get('email');
    const token = new URLSearchParams(location.search).get('token');

    const handleDeleteUser = async () => {
        try {
            const response = await fetch('http://localhost:8080/users', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, token }),
            });

            const data = await response.json();

            if (response.ok && data.code === 200) {
                setSuccess(true);
            } else {
                setError('탈퇴 처리에 실패했습니다.');
            }
        } catch (error) {
            setError('서버와의 연결에 문제가 발생했습니다.');
        }
    };

    return (
        <div className="delete-user-container">
            <div className="delete-user-content">
                <h1>메일메일 구독 해지</h1>

                {!success ? (
                    <>
                        <p className="description">
                            해지하면 기술 질문을 더 이상 받아볼 수 없어요.
                        </p>
                        <p className="confirmation-text">
                            메일메일 구독을 해지하시겠습니까?
                        </p>
                        <button onClick={handleDeleteUser} className="unsubscribe-button">
                            구독 해지하기
                        </button>
                        {error && <p className="error-message">{error}</p>}
                    </>
                ) : (
                    <div className="success-message">
                        <p>구독 해지가 완료되었습니다.</p>
                        <p>그동안 메일메일을 이용해 주셔서 감사합니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeleteUserPage;

