import React, { useRef, useState } from 'react';
import { Form, Button, Alert, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ForgotPassword = () => {
	const emailRef = useRef();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const { forgotPassword } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		setError(null);

		// await forgotPassword and navigate to login
		try {
			setLoading(true);
			await forgotPassword(emailRef.current.value);
			navigate('/login');
		} catch (e) {
			setError(
				'Something went wrong. Please check that the email address is correct.'
			);
			setLoading(false);
		}
	};

	return (
		<>
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<h3 className='text-center my-3'>Reset password</h3>

					{error && <Alert variant='danger'>{error}</Alert>}

					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type='email'
								ref={emailRef}
								required
							/>
							<Form.Text className='text-muted'>
								An email with further instructions will be sent
								to you.
							</Form.Text>
						</Form.Group>

						<Button
							variant='secondary'
							type='submit'
							disabled={loading}
						>
							Reset password
						</Button>
					</Form>

					<div className='text-center mt-4'>
						<p>
							<Link to='/login' className='link'>
								Log in?
							</Link>
						</p>
					</div>
				</Col>
			</Row>
		</>
	);
};

export default ForgotPassword;
