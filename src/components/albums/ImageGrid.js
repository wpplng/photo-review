import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { SRLWrapper } from 'simple-react-lightbox';
import { db } from '../../firebase';

const ImageGrid = ({ images, album }) => {
	const [selectedImages, setSelectedImages] = useState([]);
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	const handleSelectImages = (e, image) => {
		let newAlbumImages;
		if (e.target.checked) {
			if (selectedImages.length === 0) {
				newAlbumImages = [];
			} else {
				newAlbumImages = [...selectedImages];
			}

			newAlbumImages.push(image);
			setSelectedImages(newAlbumImages);
		} else {
			newAlbumImages = selectedImages.filter(
				(img) => img.id !== image.id
			);
			setSelectedImages(newAlbumImages);
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

			// add images
			selectedImages.forEach((img) => {
				img.album = db.collection('albums').doc(albumRef.id);
				db.collection('images').add(img);
			});

			navigate(`/albums/${albumRef.id}`);
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
								<Card.Text className='text-muted small'>
									{image.name} (
									{Math.round(image.size / 1024)} kb)
								</Card.Text>
								<div>
									<input
										type='checkbox'
										name='select-image'
										id={image.id}
										onChange={(e) => {
											handleSelectImages(e, image);
										}}
									/>
									<label
										className='ml-2 text-muted small'
										htmlFor='select-image'
									>
										Select image
									</label>
								</div>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>

			{selectedImages.length > 0 && (
				<div>
					<Button
						className='mb-2'
						variant='outline-success'
						onClick={handleCreateNewAlbum}
					>
						Create new album
					</Button>
				</div>
			)}
		</SRLWrapper>
	);
};

export default ImageGrid;
