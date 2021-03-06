import React, { useState } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { db } from '../../firebase';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';

const EditTitle = () => {
	const [title, setTitle] = useState('');
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { albumId } = useParams();
	const { state } = useLocation();

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
			await db.collection('albums').doc(albumId).update({
				title,
			});
			navigate(`/albums/${albumId}`);
		} catch (e) {
			console.error(e.message);
			setError(
				'An error occured when trying to edit album title. Please try again.'
			);
			setLoading(false);
		}
	};
	return (
		<>
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					{state && (
						<h3 className='text-center my-3'>
							Edit title for album:{' '}
							<span className='font-weight-bold'>
								{state.album.title}
							</span>
						</h3>
					)}

					{error && <Alert variant='danger'>{error}</Alert>}

					<Form onSubmit={handleSubmit}>
						<Form.Group id='title'>
							<Form.Label>New album title</Form.Label>
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
							Edit title
						</Button>
					</Form>

					<div className='text-center mt-4'>
						<p>
							<Link to={`/albums/${albumId}`} className='link'>
								Back to album?
							</Link>
						</p>
					</div>
				</Col>
			</Row>
		</>
	);
};

export default EditTitle;
