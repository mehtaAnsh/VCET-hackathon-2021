import React, { useState, useEffect } from 'react';
import Header from '../Header/header';
import {
	Container,
	Row,
	Col,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	FormGroup,
	Form,
	Label,
	Input,
	Card,
	CardBody,
	CardTitle,
	CardSubtitle,
	Spinner,
} from 'reactstrap';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router';

const Satellite = () => {
	const [modal, setModal] = useState(false);
	const [mumbai, setMumbai] = useState({});
	const [delhi, setDelhi] = useState({});
	const [chennai, setChennai] = useState({});
	const [kolkata, setKolkata] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const history = useHistory();

	useEffect(async () => {
		await axios
			.get(`https://api.weatherapi.com/v1/current.json?key=6eccc50a9d37404e8d554734210210&q=Mumbai&aqi=yes`)
			.then(async ({ data }) => {
				setMumbai(data);
				await axios
					.get(
						`https://api.weatherapi.com/v1/current.json?key=6eccc50a9d37404e8d554734210210&q=New Delhi&aqi=yes`
					)
					.then(async ({ data }) => {
						setDelhi(data);
						await axios
							.get(
								`https://api.weatherapi.com/v1/current.json?key=6eccc50a9d37404e8d554734210210&q=Chennai&aqi=yes`
							)
							.then(async ({ data }) => {
								setChennai(data);
								await axios
									.get(
										`https://api.weatherapi.com/v1/current.json?key=6eccc50a9d37404e8d554734210210&q=Kolkata&aqi=yes`
									)
									.then(({ data }) => {
										setKolkata(data);
										setIsLoading(false);
									})
									.catch(err => console.log(err));
							})
							.catch(err => console.log(err));
					})
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
	}, []);

	const toggle = () => setModal(!modal);

	const [lat, setLat] = useState('');
	const [long, setLong] = useState('');

	const handleSubmit = async () => {
		const id = toast.loading('Processing...');
		await axios
			.post(
				'https://vcet-flood.herokuapp.com/alert_users',
				{ test_lat: lat, test_long: long },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			)
			.then(res => {
				if (res.status === 200) {
					toast.success('Successfully sent to all users in the area.', { id });
				}
				if (res.status === 204) {
					toast.success('No users found in that area.', { id });
				}
			})
			.catch(err => toast.error(`Failed: ${err}`), { id });
	};

	return (
		<>
			<Header />
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Modal title</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label for="exampleEmail">Enter place</Label>
							<Input
								type="email"
								name="email"
								onBlur={async e => {
									await axios
										.get(
											`http://api.positionstack.com/v1/forward?access_key=6dd87d14a439c6e5017e87b7bb992c65&query=${e.target.value}, India`
										)
										.then(({ data }) => {
											console.log(data);
											setLat(data.data[0].latitude);
											setLong(data.data[0].longitude);
										});
								}}
								placeholder="Eg: Mira road"
								className="mb-3"
							/>
						</FormGroup>
					</Form>
					<span>
						{lat && <p>Lat: {lat}</p>}
						{long && <p>Long: {long}</p>}
					</span>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={handleSubmit}>
						Submit
					</Button>{' '}
					<Button color="secondary" onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
			<Container className="mt-5">
				<Row>
					<Col lg={12}>
						<span>
							<h3 style={{ float: 'left' }}>Major cities</h3>
							<Button
								onClick={() => history.push('/admin/getSatelliteImage', { lat, long })}
								style={{ float: 'right', marginLeft: '10px' }}
								color="primary"
							>
								Check satellite images
							</Button>
							<Button style={{ float: 'right' }} onClick={toggle} color="danger">
								Alert users!
							</Button>
						</span>
					</Col>
				</Row>

				{isLoading && (
					<center>
						<Spinner />
					</center>
				)}

				{Object.keys(mumbai).length > 0 && (
					<Row className="mt-5">
						<Card>
							<Row className=" py-3">
								<center>
									<h3>Mumbai</h3>
								</center>
								<Col lg={2} md={6} sm={12}>
									<Card style={{ borderColor: 'blue' }}>
										<center>
											<CardBody>
												<CardTitle tag="h5">{mumbai.location.lat}</CardTitle>
												<CardSubtitle tag="h6" className="mb-2 text-muted">
													Latitude
												</CardSubtitle>
											</CardBody>
										</center>
									</Card>
								</Col>
								<Col lg={2} md={6} sm={12}>
									<Card style={{ borderColor: 'blue' }}>
										<center>
											<CardBody>
												<CardTitle tag="h5">{mumbai.location.lon}</CardTitle>
												<CardSubtitle tag="h6" className="mb-2 text-muted">
													Longitude
												</CardSubtitle>
											</CardBody>
										</center>
									</Card>
								</Col>
								<Col lg={2} md={6} sm={12}>
									<Card style={{ borderColor: 'blue' }}>
										<center>
											<CardBody>
												<CardTitle tag="h5">
													{(Math.round(mumbai.current.air_quality.pm2_5 * 100) / 100).toFixed(
														2
													)}
												</CardTitle>
												<CardSubtitle tag="h6" className="mb-2 text-muted">
													AQI (PM2.5)
												</CardSubtitle>
											</CardBody>
										</center>
									</Card>
								</Col>
								<Col lg={2} md={6} sm={12}>
									<Card style={{ borderColor: 'blue' }}>
										<center>
											<CardBody>
												<CardTitle tag="h5">
													{(Math.round(mumbai.current.air_quality.pm10 * 100) / 100).toFixed(
														2
													)}
												</CardTitle>
												<CardSubtitle tag="h6" className="mb-2 text-muted">
													AQI (PM10)
												</CardSubtitle>
											</CardBody>
										</center>
									</Card>
								</Col>
								<Col lg={2} md={6} sm={12}>
									<Card style={{ borderColor: 'blue' }}>
										<center>
											<CardBody>
												<CardTitle tag="h5">{mumbai.current.humidity}%</CardTitle>
												<CardSubtitle tag="h6" className="mb-2 text-muted">
													Humidity
												</CardSubtitle>
											</CardBody>
										</center>
									</Card>
								</Col>
								<Col lg={2} md={6} sm={12}>
									<Card style={{ borderColor: 'blue' }}>
										<center>
											<CardBody>
												<CardTitle tag="h5">{mumbai.current.temp_c} celsius</CardTitle>
												<CardSubtitle tag="h6" className="mb-2 text-muted">
													Temperature
												</CardSubtitle>
											</CardBody>
										</center>
									</Card>
								</Col>
							</Row>
						</Card>
					</Row>
				)}
				{Object.keys(delhi).length > 0 && (
					<Row className="mt-5">
						<Card>
							<Row className=" py-3">
								<center>
									<h3>New Delhi</h3>
								</center>
								<Col lg={2} md={6} sm={12}>
									<Card style={{ borderColor: 'blue' }}>
										<center>
											<CardBody>
												<CardTitle tag="h5">{delhi.location.lat}</CardTitle>
												<CardSubtitle tag="h6" className="mb-2 text-muted">
													Latitude
												</CardSubtitle>
											</CardBody>
										</center>
									</Card>
								</Col>
								<Col lg={2} md={6} sm={12}>
									<Card style={{ borderColor: 'blue' }}>
										<center>
											<CardBody>
												<CardTitle tag="h5">{delhi.location.lon}</CardTitle>
												<CardSubtitle tag="h6" className="mb-2 text-muted">
													Longitude
												</CardSubtitle>
											</CardBody>
										</center>
									</Card>
								</Col>
								<Col lg={2} md={6} sm={12}>
									<Card style={{ borderColor: 'blue' }}>
										<center>
											<CardBody>
												<CardTitle tag="h5">
													{(Math.round(delhi.current.air_quality.pm2_5 * 100) / 100).toFixed(
														2
													)}
												</CardTitle>
												<CardSubtitle tag="h6" className="mb-2 text-muted">
													AQI (PM2.5)
												</CardSubtitle>
											</CardBody>
										</center>
									</Card>
								</Col>
								<Col lg={2} md={6} sm={12}>
									<Card style={{ borderColor: 'blue' }}>
										<center>
											<CardBody>
												<CardTitle tag="h5">
													{(Math.round(delhi.current.air_quality.pm10 * 100) / 100).toFixed(
														2
													)}
												</CardTitle>
												<CardSubtitle tag="h6" className="mb-2 text-muted">
													AQI (PM10)
												</CardSubtitle>
											</CardBody>
										</center>
									</Card>
								</Col>
								<Col lg={2} md={6} sm={12}>
									<Card style={{ borderColor: 'blue' }}>
										<center>
											<CardBody>
												<CardTitle tag="h5">{delhi.current.humidity}%</CardTitle>
												<CardSubtitle tag="h6" className="mb-2 text-muted">
													Humidity
												</CardSubtitle>
											</CardBody>
										</center>
									</Card>
								</Col>
								<Col lg={2} md={6} sm={12}>
									<Card style={{ borderColor: 'blue' }}>
										<center>
											<CardBody>
												<CardTitle tag="h5">{delhi.current.temp_c} celsius</CardTitle>
												<CardSubtitle tag="h6" className="mb-2 text-muted">
													Temperature
												</CardSubtitle>
											</CardBody>
										</center>
									</Card>
								</Col>
							</Row>
						</Card>
					</Row>
				)}
				{Object.keys(chennai).length > 0 && (
					<Row className="mt-5">
						<Card>
							<Row className=" py-3">
								<center>
									<h3>Chennai</h3>
								</center>
								<Col lg={2} md={6} sm={12}>
									<Card style={{ borderColor: 'blue' }}>
										<center>
											<CardBody>
												<CardTitle tag="h5">{chennai.location.lat}</CardTitle>
												<CardSubtitle tag="h6" className="mb-2 text-muted">
													Latitude
												</CardSubtitle>
											</CardBody>
										</center>
									</Card>
								</Col>
								<Col lg={2} md={6} sm={12}>
									<Card style={{ borderColor: 'blue' }}>
										<center>
											<CardBody>
												<CardTitle tag="h5">{chennai.location.lon}</CardTitle>
												<CardSubtitle tag="h6" className="mb-2 text-muted">
													Longitude
												</CardSubtitle>
											</CardBody>
										</center>
									</Card>
								</Col>
								<Col lg={2} md={6} sm={12}>
									<Card style={{ borderColor: 'blue' }}>
										<center>
											<CardBody>
												<CardTitle tag="h5">
													{(
														Math.round(chennai.current.air_quality.pm2_5 * 100) / 100
													).toFixed(2)}
												</CardTitle>
												<CardSubtitle tag="h6" className="mb-2 text-muted">
													AQI (PM2.5)
												</CardSubtitle>
											</CardBody>
										</center>
									</Card>
								</Col>
								<Col lg={2} md={6} sm={12}>
									<Card style={{ borderColor: 'blue' }}>
										<center>
											<CardBody>
												<CardTitle tag="h5">
													{(Math.round(chennai.current.air_quality.pm10 * 100) / 100).toFixed(
														2
													)}
												</CardTitle>
												<CardSubtitle tag="h6" className="mb-2 text-muted">
													AQI (PM10)
												</CardSubtitle>
											</CardBody>
										</center>
									</Card>
								</Col>
								<Col lg={2} md={6} sm={12}>
									<Card style={{ borderColor: 'blue' }}>
										<center>
											<CardBody>
												<CardTitle tag="h5">{chennai.current.humidity}%</CardTitle>
												<CardSubtitle tag="h6" className="mb-2 text-muted">
													Humidity
												</CardSubtitle>
											</CardBody>
										</center>
									</Card>
								</Col>
								<Col lg={2} md={6} sm={12}>
									<Card style={{ borderColor: 'blue' }}>
										<center>
											<CardBody>
												<CardTitle tag="h5">{chennai.current.temp_c} celsius</CardTitle>
												<CardSubtitle tag="h6" className="mb-2 text-muted">
													Temperature
												</CardSubtitle>
											</CardBody>
										</center>
									</Card>
								</Col>
							</Row>
						</Card>
					</Row>
				)}
				{Object.keys(kolkata).length > 0 && (
					<Row className="mt-5">
						<Card>
							<Row className=" py-3">
								<center>
									<h3>Kolkata</h3>
								</center>
								<Col lg={2} md={6} sm={12}>
									<Card style={{ borderColor: 'blue' }}>
										<center>
											<CardBody>
												<CardTitle tag="h5">{kolkata.location.lat}</CardTitle>
												<CardSubtitle tag="h6" className="mb-2 text-muted">
													Latitude
												</CardSubtitle>
											</CardBody>
										</center>
									</Card>
								</Col>
								<Col lg={2} md={6} sm={12}>
									<Card style={{ borderColor: 'blue' }}>
										<center>
											<CardBody>
												<CardTitle tag="h5">{kolkata.location.lon}</CardTitle>
												<CardSubtitle tag="h6" className="mb-2 text-muted">
													Longitude
												</CardSubtitle>
											</CardBody>
										</center>
									</Card>
								</Col>
								<Col lg={2} md={6} sm={12}>
									<Card style={{ borderColor: 'blue' }}>
										<center>
											<CardBody>
												<CardTitle tag="h5">
													{(
														Math.round(kolkata.current.air_quality.pm2_5 * 100) / 100
													).toFixed(2)}
												</CardTitle>
												<CardSubtitle tag="h6" className="mb-2 text-muted">
													AQI (PM2.5)
												</CardSubtitle>
											</CardBody>
										</center>
									</Card>
								</Col>
								<Col lg={2} md={6} sm={12}>
									<Card style={{ borderColor: 'blue' }}>
										<center>
											<CardBody>
												<CardTitle tag="h5">
													{(Math.round(kolkata.current.air_quality.pm10 * 100) / 100).toFixed(
														2
													)}
												</CardTitle>
												<CardSubtitle tag="h6" className="mb-2 text-muted">
													AQI (PM10)
												</CardSubtitle>
											</CardBody>
										</center>
									</Card>
								</Col>
								<Col lg={2} md={6} sm={12}>
									<Card style={{ borderColor: 'blue' }}>
										<center>
											<CardBody>
												<CardTitle tag="h5">{kolkata.current.humidity}%</CardTitle>
												<CardSubtitle tag="h6" className="mb-2 text-muted">
													Humidity
												</CardSubtitle>
											</CardBody>
										</center>
									</Card>
								</Col>
								<Col lg={2} md={6} sm={12}>
									<Card style={{ borderColor: 'blue' }}>
										<center>
											<CardBody>
												<CardTitle tag="h5">{kolkata.current.temp_c} celsius</CardTitle>
												<CardSubtitle tag="h6" className="mb-2 text-muted">
													Temperature
												</CardSubtitle>
											</CardBody>
										</center>
									</Card>
								</Col>
							</Row>
						</Card>
					</Row>
				)}

				<Row>
					<Col lg={12}></Col>
				</Row>
			</Container>
		</>
	);
};

export default Satellite;
