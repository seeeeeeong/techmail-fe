import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage'; // 메인 페이지 컴포넌트
import QuestionDetail from './components/QuestionDetail'; // QuestionDetail 컴포넌트
import QuestionList from './components/QuestionList'; // QuestionList 컴포넌트 추가
import DeleteUserPage from './components/DeleteUserPage';  // 추가된 구독 해지 페이지 컴포넌트

const App = () => {
    return (
        <Router>
            <Routes>
                {/* 기본 메인 페이지 */}
                <Route path="/" element={<MainPage />} />

                {/* URL 파라미터로 id를 받아서 QuestionDetail 페이지 표시 */}
                <Route path="/question/:id" element={<QuestionDetail />} />

                {/* 쿼리 스트링을 사용해서 이메일로 질문 목록 조회 */}
                <Route path="/user-questions" element={<QuestionList />} />

                {/* 구독 해지 페이지 라우팅 */}
                <Route path="/users" element={<DeleteUserPage />} />
            </Routes>
        </Router>
    );
};

export default App;
