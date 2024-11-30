import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getUserQuestions } from '../services/questionService';
import './QuestionList.css';

const QuestionList = () => {
    const location = useLocation();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const email = new URLSearchParams(location.search).get('email');

    useEffect(() => {
        if (email) {
            const fetchQuestions = async () => {
                try {
                    const questionData = await getUserQuestions(email);
                    setQuestions(questionData);
                } catch (err) {
                    setError('질문 목록을 가져오는 데 실패했습니다.');
                } finally {
                    setLoading(false);
                }
            };
            fetchQuestions();
        }
    }, [email]);

    if (loading) return <div className="loading">로딩 중...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="question-list">
            <div className="question-list-header">
                <h1>질문 모아보기</h1>
                <h2>{email}으로 지금까지 전송된 질문이에요!</h2>
            </div>

            {questions.length === 0 ? (
                <div className="empty-state">
                    <p>아직 받은 질문이 없습니다.</p>
                    <p>첫 번째 질문을 기다리고 있어요!</p>
                </div>
            ) : (
                <ul className="questions-container">
                    {questions.map((question) => (
                        <li key={question.id} className="question-item">
                            <Link to={`/question/${question.id}`}>
                                <h3>{question.title}</h3>
                                {question.date && (
                                    <span className="question-date">🕒 {question.date}</span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default QuestionList;

