import React, { useState } from 'react';
import { loginUser } from '../../../../redux/apiRequest';
import './SignIn.css';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();
		const user = {
			username,
			password,
		};
		// console.log(user);
		loginUser(user, dispatch, navigate);
	};

	return (
		<div className="signIn">
			<div className="container flex flex-c flex-column">
				<div className="section-title">
					<h2>Sign In</h2>
				</div>
				<form className="signIn-form" onSubmit={handleLogin}>
					<div className="form-group flex flex-column">
						<label htmlFor="username">UserName</label>
						<input
							type="text"
							name="username"
							placeholder="username"
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="form-group flex flex-column">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							placeholder="password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button className="btn-signin" type="submit">
						Sign In
					</button>
					<p className="link">
						Don't have an account? <Link to="/signup">Sign up</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
