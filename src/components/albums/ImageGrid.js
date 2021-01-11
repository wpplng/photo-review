import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { SRLWrapper } from 'simple-react-lightbox';

const ImageGrid = ({ images }) => {
	const [selectedImages, setSelectedImages] = useState([]);

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
	console.log(selectedImages);

	return (
		<SRLWrapper>
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
										className='ml-2'
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
		</SRLWrapper>
	);
};

export default ImageGrid;
