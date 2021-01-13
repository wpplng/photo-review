import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const AlbumGrid = ({ albums }) => {
	return (
		<ListGroup variant='flush'>
			{albums.map((album) => (
				<ListGroupItem key={album.id}>
					<Link to={`/albums/${album.id}`}>{album.title}</Link>
				</ListGroupItem>
			))}
		</ListGroup>
	);
};

export default AlbumGrid;
