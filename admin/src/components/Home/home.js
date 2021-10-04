import api from '../../api/axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router';

const Home = props => {
	const history = useHistory();
	const [password, setPassword] = useState('');

	async function handleSubmit(event) {
		event.preventDefault();
		if (password !== 'pass@123') {
			toast.error('Incorrect password. Please try again.');
			return;
		}
		toast.success('Success!');
		await api
			.get('/getToken')
			.then(res => {
				props.setIsLoggedIn(true);
				localStorage.setItem('token', res.data.token);
				history.push('/admin/satellite');
			})
			.catch(err => console.log(err));
	}

	return (
		<div class="container mt-5">
			<div class="row mt-5">
				<div class="col-sm-9 col-md-7 col-lg-5 mx-auto mt-5">
					<div class="card border-0 shadow rounded-3 my-5">
						<div class="card-body p-4 p-sm-5">
							<h5 class="card-title text-center mb-5 fw-light fs-5">Welcome, Admin!</h5>
							<form onSubmit={handleSubmit}>
								<div class="form-floating mb-3">
									<input
										type="password"
										onChange={e => setPassword(e.target.value)}
										value={password}
										class="form-control"
										id="floatingPassword"
										placeholder="Password"
									/>
									<label for="floatingPassword">Password</label>
								</div>

								<div class="d-grid">
									<button class="btn btn-primary btn-login text-uppercase fw-bold" type="submit">
										Sign in
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
