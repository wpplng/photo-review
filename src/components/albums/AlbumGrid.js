import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';

const AlbumGrid = ({ albums }) => {
	return (
		<Row>
			{albums.map((album) => (
				<Col sm={6} md={4} lg={3} key={album.id}>
					<Card className='mb-3'>
						<Card.Body>
							<Card.Title>
								<Link to={`/albums/${album.id}`}>
									{album.title}
								</Link>
							</Card.Title>
						</Card.Body>
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default AlbumGrid;
