import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import Admin from './Admin/admin';
import Home from './Home/home';
import Dams from './Dams/dams';
import Satellite from './Satellite/satellite';

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	return (
		<BrowserRouter>
			<Toaster />
			<Switch>
				<Route path="/" exact>
					<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
				</Route>
				<Route path="/admin" exact>
					<Admin isLoggedIn={isLoggedIn} />
				</Route>
				<Route path="/admin/getSatelliteImage" exact component={Dams} />
				<Route path="/admin/satellite" exact component={Satellite} />
				<Redirect to="/" />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
