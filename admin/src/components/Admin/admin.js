import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { Container, Row, Col, Button } from 'reactstrap';
import Header from '../Header/header';
import api from '../../api/axios';

const Admin = props => {
	const history = useHistory();
	useEffect(async () => {
		/* if (!props.isLoggedIn) {
			history.push('/');
			return;
		} */
	});
	return (
		<>
			<Header />
			<Container>
				<Row style={{ marginTop: '30vh' }}>
					<Col md="6" className="flex justify-content-center">
						<center>
							<Button
								onClick={() => history.push('/admin/dams')}
								color="primary"
								style={{ width: '200px', height: '100px' }}
							>
								<h4>
									Dams
									<br /> Management
								</h4>
							</Button>
						</center>
					</Col>
					<Col md="6">
						<center>
							<Button
								onClick={() => history.push('/admin/satellite')}
								color="primary"
								style={{ width: '200px', height: '100px' }}
							>
								<h4>
									Satellite Imagery
									<br /> Detection
								</h4>
							</Button>
						</center>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Admin;
