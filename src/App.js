import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/scss/app.scss';
import { Container } from 'react-bootstrap';
import AuthContextProvider from './context/AuthContext';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Navigation from './components/Navigation';
import NotFound from './components/NotFound';
import Signup from './components/Signup';

const App = () => {
	return (
		<Router>
			<AuthContextProvider>
				<Navigation />

				<Container className='py-3'>
					<Routes>
						<Route path='/'>
							<Home />
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

						<Route path='*' element={<NotFound />} />
					</Routes>
				</Container>
			</AuthContextProvider>
		</Router>
	);
};

export default App;
