import React from 'react';
import { useParams } from 'react-router-dom';
import useAlbum from '../../hooks/useAlbum';
import ReviewImagesGrid from './ReviewImageGrid';
import { Spinner } from 'react-bootstrap';

const ReviewAlbum = () => {
	const { albumId } = useParams();
	const { album, images, loading } = useAlbum(albumId);

	return (
		<>
			<h2 className='mb-4 text-center'>{album && album.title}</h2>
			<p className='text-muted small'>
				Please select like or dislike on all photos before sending your
				review.
			</p>

			{loading ? (
				<Spinner animation='border' role='status'>
					<span className='sr-only'>Loading...</span>
				</Spinner>
			) : (
				<ReviewImagesGrid images={images} album={album} />
			)}
		</>
	);
};

export default ReviewAlbum;
