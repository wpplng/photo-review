import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/scss/app.scss';
import { Container } from 'react-bootstrap';
import AuthContextProvider from './context/AuthContext';
import SimpleReactLightbox from 'simple-react-lightbox';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Navigation from './components/Navigation';
import NotFound from './components/NotFound';
import Signup from './components/Signup';
import Albums from './components/albums/Albums';
import CreateAlbum from './components/albums/CreateAlbum';
import Album from './components/albums/Album';
import ReviewAlbum from './components/albums/ReviewAlbum';
import EditTitle from './components/albums/EditTitle';
import ProtectedRoute from './components/ProtectedRoute';
import ReviewSent from './components/ReviewSent';

const App = () => {
	return (
		<Router>
			<AuthContextProvider>
				<SimpleReactLightbox>
					<Navigation />

					<Container className='py-3'>
						<Routes>
							<Route path='/'>
								<Home />
							</Route>

							<Route path='/albums'>
								<ProtectedRoute path='/'>
									<Albums />
								</ProtectedRoute>

								<ProtectedRoute path='/create'>
									<CreateAlbum />
								</ProtectedRoute>

								<ProtectedRoute path='/:albumId'>
									<Album />
								</ProtectedRoute>

								<ProtectedRoute path='/:albumId/edit'>
									<EditTitle />
								</ProtectedRoute>

								<Route path='/review/:albumId'>
									<ReviewAlbum />
								</Route>
							</Route>

							<Route path='/signup'>
								<Signup />
							</Route>

							<Route path='/login'>
								<Login />
							</Route>

							<Route path='/logout'>
								<Logout />
							</Route>

							<Route path='/forgot-password'>
								<ForgotPassword />
							</Route>

							<Route path='/review-sent'>
								<ReviewSent />
							</Route>

							<Route path='*' element={<NotFound />} />
						</Routes>
					</Container>
				</SimpleReactLightbox>
			</AuthContextProvider>
		</Router>
	);
};

export default App;
