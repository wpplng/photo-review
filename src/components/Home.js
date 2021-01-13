import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card } from 'react-bootstrap';
import camera from '../assets/images/camera.png';

const Home = () => {
	const { currentUser } = useAuth();
	return (
		<div className='d-flex justify-content-center'>
			<Card style={{ width: '24rem' }}>
				<Card.Img variant='top' src={camera} />
				<Card.Body>
					<Card.Title>Photo Review</Card.Title>
					<Card.Text>
						This is an app for photographers to share and review
						images with customers. You can create albums, upload
						images and create new albums with selected images.
					</Card.Text>
					{currentUser && (
						<p className='text-center mt-4 font-weight-bold'>
							<Link to='/albums/create' className='link'>
								Create album
							</Link>
						</p>
					)}

					{!currentUser && (
						<p className='text-center mt-4 font-weight-bold'>
							<Link to='/signup' className='link'>
								Sign up?
							</Link>
						</p>
					)}
				</Card.Body>
			</Card>
		</div>
	);
};

export default Home;
