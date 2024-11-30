import React from 'react';
import { Link } from 'react-router-dom';

const DeleteUserLink = ({ email, token }) => {
    return (
        <Link
            to={`http://localhost:8080/users?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`}
            style={{ color: '#6B7280', textDecoration: 'none' }}
        >
            구독 해지
        </Link>
    );
};

export default DeleteUserLink;
