export const getUserQuestions = async (email) => {
    try {
        const response = await fetch(`http://localhost:8080/user-question?email=${email}`);
        if (!response.ok) {
            throw new Error('질문 목록을 가져오는 데 실패했습니다.');
        }
        const data = await response.json();
        return data.data.content;
    } catch (error) {
        throw error;
    }
};
