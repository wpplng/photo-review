import React, { useRef, useState } from 'react';
import { Form, Button, Alert, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Signup = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmationRef = useRef();
	const { signup } = useAuth();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		// set error state if the passwords does not match
		if (
			passwordRef.current.value !== passwordConfirmationRef.current.value
		) {
			setError('The passwords has to be the same');
			return;
		}
		setError(null);

		// await signup and navigate to home
		try {
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			navigate('/');
		} catch (e) {
			setError(e.message);
			setLoading(false);
		}
	};

	return (
		<>
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<h3 className='text-center my-3'>Create account</h3>

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

						<Form.Group controlId='password-confirmation'>
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
								type='password'
								ref={passwordConfirmationRef}
								required
							/>
						</Form.Group>

						<Button
							variant='secondary'
							type='submit'
							disabled={loading}
						>
							Sign up
						</Button>
					</Form>

					<div className='text-center mt-4'>
						<Link to='/login' className='link'>
							Log in?
						</Link>
					</div>
				</Col>
			</Row>
		</>
	);
};

export default Signup;
