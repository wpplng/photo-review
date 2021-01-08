import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAlbum from '../../hooks/useAlbum';
import ImagesGrid from './ImageGrid';
import { Alert, Button, Spinner } from 'react-bootstrap';
import UploadImage from './UploadImage';

const Album = () => {
	const { albumId } = useParams();
	const { album, images, loading } = useAlbum(albumId);
	const [inviteLink, setInviteLink] = useState(null);

	const handleInviteLink = () => {
		setInviteLink(`/review/${albumId}`);
	};

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

			{inviteLink ? (
				<Alert variant='success'>
					Invite link for customer: {inviteLink}
				</Alert>
			) : (
				<Button
					variant='outline-primary'
					onClick={handleInviteLink}
					disabled={loading}
				>
					Create invite link
				</Button>
			)}
		</>
	);
};

export default Album;
