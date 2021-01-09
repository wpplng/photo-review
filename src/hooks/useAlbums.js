import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

const useAlbums = () => {
	const [albums, setAlbums] = useState([]);
	const [loading, setLoading] = useState(true);
	const { currentUser } = useAuth();

	// listen to changes in albums in firestore
	useEffect(() => {
		const unsubscribe = db
			.collection('albums')
			.where('owner', '==', currentUser.uid)
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
	}, [currentUser.uid]);

	return { albums, loading };
};

export default useAlbums;
