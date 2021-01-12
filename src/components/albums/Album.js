import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAlbum from '../../hooks/useAlbum';
import ImagesGrid from './ImageGrid';
import { Alert, Button, Spinner } from 'react-bootstrap';
import UploadImage from './UploadImage';

const Album = () => {
	const { albumId } = useParams();
	const { album, images, loading } = useAlbum(albumId);
	const [inviteLink, setInviteLink] = useState(null);
	const baseUrl = 'http://localhost:3000';

	const handleInviteLink = () => {
		setInviteLink(`${baseUrl}/albums/review/${albumId}`);
	};

	return (
		<>
			<h2 className='mb-4 text-center'>{album && album.title}</h2>

			<UploadImage albumId={albumId} />

			<p className='text-muted small'>
				Select images to create a new album.
			</p>

			{loading ? (
				<Spinner animation='border' role='status'>
					<span className='sr-only'>Loading...</span>
				</Spinner>
			) : (
				<ImagesGrid images={images} album={album} />
			)}

			{inviteLink ? (
				<Alert variant='success'>
					Invite link for customer: {inviteLink}
				</Alert>
			) : (
				<Button
					variant='secondary'
					onClick={handleInviteLink}
					disabled={loading}
				>
					Create invite link
				</Button>
			)}

			<div className='text-center mt-4'>
				<Link
					to={`/albums/${albumId}/edit`}
					state={{ album }}
					className='link'
				>
					Edit album title?
				</Link>
			</div>
		</>
	);
};

export default Album;
