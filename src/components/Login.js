import React, { useRef, useState } from 'react';
import { Form, Button, Alert, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login } = useAuth();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		setError(null);

		// await login and navigate to home
		try {
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			navigate('/');
		} catch (e) {
			setError(
				'An error occured when trying to login. Please try again.'
			);
			setLoading(false);
		}
	};

	return (
		<>
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<h3 className='text-center my-3'>Log in</h3>

					{error && <Alert variant='danger'>{error}</Alert>}

					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type='email'
								ref={emailRef}
								required
							/>
						</Form.Group>

						<Form.Group id='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								ref={passwordRef}
								required
							/>
						</Form.Group>

						<Button
							variant='secondary'
							type='submit'
							disabled={loading}
						>
							Log in
						</Button>
					</Form>

					<div className='text-center mt-4'>
						<p>
							<Link to='/signup' className='link'>
								Sign up?
							</Link>
						</p>
						<p>
							<Link to='/forgot-password' className='link'>
								Forgot your password?
							</Link>
						</p>
					</div>
				</Col>
			</Row>
		</>
	);
};

export default Login;
