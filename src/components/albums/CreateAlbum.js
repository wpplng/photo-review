import React, { useState } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateAlbum = () => {
	const [title, setTitle] = useState('');
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const { currentUser } = useAuth();
	const navigate = useNavigate();

	const handleChangeTitle = (e) => {
		setTitle(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (title.length < 3) {
			return;
		}

		setError(false);
		setLoading(true);

		try {
			await db.collection('albums').add({
				title,
				owner: currentUser.uid,
			});
			navigate(`/albums`);
		} catch (e) {
			console.error(e.message);
			setError(
				'An error occured when trying to create album. Please try again.'
			);
			setLoading(false);
		}
	};

	return (
		<>
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<h3 className='text-center my-3'>Create a new album</h3>

					{error && <Alert variant='danger'>{error}</Alert>}

					<Form onSubmit={handleSubmit}>
						<Form.Group id='title'>
							<Form.Label>Album title</Form.Label>
							<Form.Control
								type='title'
								onChange={handleChangeTitle}
								value={title}
								required
							/>
							{title && title.length < 3 && (
								<Form.Text className='text-muted'>
									Title must contain at least 3 characters
								</Form.Text>
							)}
						</Form.Group>

						<Button
							variant='secondary'
							type='submit'
							disabled={loading}
						>
							Create album
						</Button>
					</Form>
				</Col>
			</Row>
		</>
	);
};

export default CreateAlbum;
