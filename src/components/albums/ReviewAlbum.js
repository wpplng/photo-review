import React from 'react';
import { useParams } from 'react-router-dom';
import useAlbum from '../../hooks/useAlbum';
import ImagesGrid from './ImageGrid';
import { Spinner } from 'react-bootstrap';

const ReviewAlbum = () => {
	const { albumId } = useParams();
	const { album, images, loading } = useAlbum(albumId);

	return (
		<>
			<h2 className='mb-4 text-center'>{album && album.title}</h2>

			{loading ? (
				<Spinner animation='border' role='status'>
					<span className='sr-only'>Loading...</span>
				</Spinner>
			) : (
				<ImagesGrid images={images} />
			)}
		</>
	);
};

export default ReviewAlbum;
