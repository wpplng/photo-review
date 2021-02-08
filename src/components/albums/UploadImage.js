import React, { useState, useEffect, useCallback } from 'react';
import Alert from 'react-bootstrap/Alert';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useDropzone } from 'react-dropzone';
import useUploadImage from '../../hooks/useUploadImage';

const UploadImage = ({ albumId }) => {
	const [uploadImage, setUploadImage] = useState(null);
	const [message, setMessage] = useState(null);
	const { uploadProgress, error, isSuccess } = useUploadImage(
		uploadImage,
		albumId
	);

	useEffect(() => {
		if (error) {
			setMessage({
				error: true,
				text: error,
			});
		} else if (isSuccess) {
			setMessage({
				success: true,
				text: 'Successfully uploaded',
			});
			setUploadImage(null);
		} else {
			setMessage(null);
		}
	}, [error, isSuccess]);

	const onDrop = useCallback((acceptedFiles) => {
		setMessage(null);

		if (acceptedFiles.length === 0) {
			return;
		}

		acceptedFiles.forEach((file) => {
			setUploadImage(file);
		});
	}, []);

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		acceptedFiles,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		accept: 'image/jpeg, image/png',
		onDrop,
	});

	return (
		<div
			{...getRootProps()}
			id='dropzone-wrapper'
			className={`text-center px-4 py-3 my-3 ${
				isDragAccept ? `drag-accept` : ``
			} ${isDragReject ? `drag-reject` : ``}`}
		>
			<input {...getInputProps()} />
			{isDragActive ? (
				isDragAccept ? (
					<p>Drop your files...</p>
				) : (
					<p>Not a valid file type</p>
				)
			) : (
				<p>Choose files to upload</p>
			)}
			{acceptedFiles && (
				<div className='accepted-files mt-2'>
					<ul className='list-unstyled'>
						{acceptedFiles.map((file) => (
							<li key={file.name}>
								<small>
									{file.name} ({Math.round(file.size / 1024)}{' '}
									kb)
								</small>
							</li>
						))}
					</ul>
				</div>
			)}

			{uploadProgress !== null && (
				<ProgressBar
					variant='secondary'
					animated
					now={uploadProgress}
				/>
			)}

			{message && (
				<Alert variant={message.error ? 'warning' : 'success'}>
					{message.text}
				</Alert>
			)}
		</div>
	);
};

export default UploadImage;
