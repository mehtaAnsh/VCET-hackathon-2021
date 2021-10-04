import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Navbar, NavbarToggler, NavbarText, Button, Container } from 'reactstrap';

const Example = props => {
	const history = useHistory();
	return (
		<div>
			<Navbar color="light" light expand="md">
				<Container>
					<center>
						<NavbarText>
							<h3>Admin Portal</h3>
						</NavbarText>
					</center>
					<Button className="btn btn-danger" onClick={() => history.push('/')}>
						Log out
					</Button>
				</Container>
			</Navbar>
		</div>
	);
};

export default Example;
