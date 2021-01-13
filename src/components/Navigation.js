import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
	const { currentUser } = useAuth();

	return (
		<>
			<Navbar variant='dark'>
				<Container>
					<Link to='/' className='navbar-brand'>
						Photo Review
					</Link>

					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							{currentUser ? (
								<>
									<NavLink to='/albums' className='nav-link'>
										Albums
									</NavLink>

									<NavDropdown
										title={currentUser.email}
										id='basic-nav-dropdown'
									>
										<NavDropdown.Divider />
										<NavLink
											to='/logout'
											className='dropdown-item'
										>
											Log out
										</NavLink>
									</NavDropdown>
								</>
							) : (
								<NavLink to='/login' className='nav-link'>
									Log in
								</NavLink>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default Navigation;
