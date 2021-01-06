import { useEffect, useState } from 'react';
import { db } from '../firebase';

const useAlbum = (albumId) => {
	const [album, setAlbum] = useState();
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		db.collection('albums')
			.doc(albumId)
			.get()
			.then((doc) => {
				setAlbum({
					id: doc.id,
					...doc.data(),
				});
			});
	}, [albumId]);

	useEffect(() => {
		const unsubscribe = db
			.collection('images')
			.where('album', '==', db.collection('albums').doc(albumId))
			.orderBy('name')
			.onSnapshot((snapshot) => {
				setLoading(true);
				const photos = [];

				snapshot.forEach((doc) => {
					photos.push({
						id: doc.id,
						...doc.data(),
					});
				});

				setImages(photos);
				setLoading(false);
			});

		return unsubscribe;
	}, [albumId]);

	return { album, images, loading };
};

export default useAlbum;
