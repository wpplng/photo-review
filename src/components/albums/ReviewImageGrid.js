import React, { useState } from 'react';
import { Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { SRLWrapper } from 'simple-react-lightbox';
import { db } from '../../firebase';

const ReviewImageGrid = ({ images, album }) => {
	const [likedImages, setLikedImages] = useState([]);
	const [dislikedImages, setDislikedImages] = useState([]);
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	const handleLikeImage = (image) => {
		// check if image already exist in liked images
		if (likedImages.includes(image)) {
			return;
		}
		// add image to liked images
		setLikedImages((prev) => [...prev, image]);

		// handle if user changes like/dislike
		if (dislikedImages.includes(image)) {
			setDislikedImages(
				dislikedImages.filter((img) => img.id !== image.id)
			);
		}
	};

	const handleDislikeImage = (image) => {
		// check if image already exist in disliked images
		if (dislikedImages.includes(image)) {
			return;
		}
		// add image to disliked images
		setDislikedImages((prev) => [...prev, image]);

		// handle if user changes like/dislike
		if (likedImages.includes(image)) {
			setLikedImages(likedImages.filter((img) => img.id !== image.id));
		}
	};

	const handleCreateNewAlbum = async () => {
		const newTitle = `${album.title}-${Date.now()}`;

		setError(false);

		// create new album
		try {
			const albumRef = await db.collection('albums').add({
				title: newTitle,
				owner: album.owner,
			});

			// add liked images
			likedImages.forEach((img) => {
				img.album = db.collection('albums').doc(albumRef.id);
				db.collection('images').add(img);
			});

			navigate(`/review-sent`);
		} catch (e) {
			console.error(e.message);
			setError(
				'An error occured when trying to create album. Please try again.'
			);
		}
	};

	return (
		<SRLWrapper>
			{error && <Alert variant='danger'>{error}</Alert>}

			<Row className='my-3'>
				{images.map((image) => (
					<Col sm={6} md={4} lg={3} key={image.id}>
						<Card className='mb-3'>
							<a
								href={image.url}
								title='View image in lightbox'
								data-attribute='SRL'
							>
								<Card.Img
									variant='top'
									src={image.url}
									title={image.name}
								/>
							</a>
							<Card.Body>
								<div className='d-flex justify-content-between'>
									<FontAwesomeIcon
										className='icon'
										icon={faHeart}
										onClick={() => handleLikeImage(image)}
									/>

									<FontAwesomeIcon
										className='icon'
										icon={faTimes}
										onClick={() =>
											handleDislikeImage(image)
										}
									/>
								</div>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>

			{likedImages.length > 0 && (
				<div>
					<h4 className='my-4 text-center'>
						Liked images {likedImages.length}/{images.length}
					</h4>
					<Row className='my-3'>
						{likedImages.map((image) => (
							<Col xs={6} md={3} lg={2} key={image.id}>
								<Card className='mb-3'>
									<a
										href={image.url}
										title='View image in lightbox'
										data-attribute='SRL'
									>
										<Card.Img
											variant='top'
											src={image.url}
											title={image.name}
										/>
									</a>
								</Card>
							</Col>
						))}
					</Row>
				</div>
			)}

			{dislikedImages.length > 0 && (
				<div>
					<h4 className='my-4 text-center'>
						Disliked images {dislikedImages.length}/{images.length}
					</h4>

					<Row className='my-3'>
						{dislikedImages.map((image) => (
							<Col xs={6} md={3} lg={2} key={image.id}>
								<Card className='mb-3'>
									<a
										href={image.url}
										title='View image in lightbox'
										data-attribute='SRL'
									>
										<Card.Img
											variant='top'
											src={image.url}
											title={image.name}
										/>
									</a>
								</Card>
							</Col>
						))}
					</Row>
				</div>
			)}

			{likedImages.length + dislikedImages.length === images.length &&
				likedImages.length > 0 && (
					<div>
						<Button
							className='mb-2'
							variant='secondary'
							onClick={handleCreateNewAlbum}
						>
							Send review
						</Button>
					</div>
				)}
		</SRLWrapper>
	);
};

export default ReviewImageGrid;
