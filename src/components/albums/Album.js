import React from 'react';
import useAlbum from '../../hooks/useAlbum';
import ImagesGrid from './ImageGrid';
import Spinner from 'react-bootstrap/Spinner';

const Album = () => {
	const { album, images, loading } = useAlbum();

	return (
		<>
			<h2 className='mb-4'>{album && album.title}</h2>

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

export default Album;
