import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = (props) => {
	const { currentUser } = useAuth();

	return currentUser ? <Route {...props} /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
