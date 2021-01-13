import React, { useEffect } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Logout = () => {
	const { logout } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			await logout();
			navigate('/login');
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<h3>Logging out</h3>
					<Spinner animation='border' role='status'>
						<span className='sr-only'>Loading...</span>
					</Spinner>
				</Col>
			</Row>
		</>
	);
};

export default Logout;
