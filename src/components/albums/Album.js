import React from 'react';
import { useParams } from 'react-router-dom';
import useAlbum from '../../hooks/useAlbum';
import ImagesGrid from './ImageGrid';
import Spinner from 'react-bootstrap/Spinner';
import UploadImage from './UploadImage';

const Album = () => {
	const { albumId } = useParams();
	const { album, images, loading } = useAlbum(albumId);

	return (
		<>
			<h2 className='mb-4 text-center'>{album && album.title}</h2>

			<UploadImage albumId={albumId} />

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
