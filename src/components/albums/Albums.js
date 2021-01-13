import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import useAlbums from '../../hooks/useAlbums';
import AlbumGrid from './AlbumGrid';
import Spinner from 'react-bootstrap/Spinner';

const Albums = () => {
	const { currentUser } = useAuth();
	const { albums, loading } = useAlbums();

	return (
		<>
			<h2 className='mb-4 text-center'>Photo Albums</h2>
			{currentUser && (
				<p className='text-muted small'>
					Showing albums for user:{' '}
					<span className='font-weight-bold'>
						{currentUser.email}
					</span>
				</p>
			)}

			{loading ? (
				<Spinner animation='border' role='status'>
					<span className='sr-only'>Loading...</span>
				</Spinner>
			) : (
				<AlbumGrid albums={albums} />
			)}

			{currentUser && (
				<div className='mt-3'>
					<Link
						to='/albums/create'
						className='btn btn-secondary mt-2'
					>
						Create new album
					</Link>
				</div>
			)}
		</>
	);
};

export default Albums;
