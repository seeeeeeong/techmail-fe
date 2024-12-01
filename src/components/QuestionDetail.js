import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './QuestionDetail.css';

const QuestionDetail = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestionDetail = async () => {
            try {
                const response = await axios.get(`https://tech-mail.site/question/${id}`);
                setQuestion(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('질문 데이터를 가져오는 데 실패했습니다.');
                setLoading(false);
            }
        };

        fetchQuestionDetail();
    }, [id]);

    const convertContent = (text) => {
        // Convert \n to <br />
        let converted = text.replace(/\\n/g, '<br />');

        // Convert **bold** to <strong>bold</strong>
        converted = converted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Convert headers (# to ######)
        converted = converted.replace(/^(#{1,6})\s(.*)$/gm, (match, hashes, content) => {
            const level = hashes.length;
            return `<h${level}>${content.trim()}</h${level}>`;
        });

        // Convert numbered lists
        converted = converted.replace(/(\d+)\.\s(.*?)(?=(?:\n\d+\.|\n\n|$))/gs, (match, number, item) => {
            return `<li>${item.trim()}</li>`;
        });
        converted = converted.replace(/<li>.*?<\/li>/gs, (match) => {
            return `<ol>${match}</ol>`;
        });

        return converted;
    };

    if (loading) return <div className="loading">로딩 중...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="question-detail">
            {question && (
                <>
                    <h1>{question.title}</h1>
                    <div className="question-meta">
                        <span>🏷️ {question.category}</span>
                    </div>
                    <div
                        className="question-content"
                        dangerouslySetInnerHTML={{ __html: convertContent(question.content) }}
                    />
                </>
            )}
        </div>
    );
};

export default QuestionDetail;

