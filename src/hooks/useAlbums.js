import { useEffect, useState } from 'react';
import { db } from '../firebase';

const useAlbums = () => {
	const [albums, setAlbums] = useState([]);
	const [loading, setLoading] = useState(true);

	// listen to changes in albums in firestore
	useEffect(() => {
		const unsubscribe = db
			.collection('albums')
			.orderBy('title')
			.onSnapshot((snapshot) => {
				setLoading(true);
				const snapshotAlbums = [];
				snapshot.forEach((doc) => {
					snapshotAlbums.push({
						id: doc.id,
						...doc.data(),
					});
				});
				setAlbums(snapshotAlbums);
				setLoading(false);
			});
		return unsubscribe;
	}, []);

	return { albums, loading };
};

export default useAlbums;
