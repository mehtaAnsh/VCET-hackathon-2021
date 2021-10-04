import React, { useState, useEffect } from 'react';
import Header from '../Header/header';
import { Card, CardBody, Col, Container, Form, FormGroup, Label, Row, Input } from 'reactstrap';
import axios from 'axios';
import { useHistory } from 'react-router';

const Dams = () => {
	const history = useHistory();

	useEffect(() => {
		console.log(history.location.state);
	}, []);

	return (
		<>
			<Header />
			<Container>
				<Row>
					<Col lg={12}>
						{
							<center>
								<img
									className="mt-5"
									src={`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${history.location.state.long},${history.location.state.lat},13/650x650?access_token=pk.eyJ1IjoibWVodGFuc2giLCJhIjoiY2t1OG83ZnJ2NXdmdDJ1bXA5ajFmM3cwZiJ9.OuGeYt4Z3kkzGYa6c0O5OA`}
								/>
							</center>
						}
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Dams;
