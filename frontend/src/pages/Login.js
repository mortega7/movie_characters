import { useEffect } from 'react';
import { json, redirect, useNavigate } from 'react-router-dom';

import LoginForm from '../components/Login/LoginForm';
import { isValidToken, setAuthToken } from '../util/auth';
import { fetchLogin } from '../util/fetch';

function LoginPage() {
	const validToken = isValidToken();
	const navigate = useNavigate();

	useEffect(() => {
		if (validToken) {
			navigate('/');
		}
	}, [validToken, navigate]);

	return <LoginForm />;
}

export default LoginPage;

export async function action({ request }) {
	const data = await request.formData();
	const authData = {
		email: data.get('email'),
		password: data.get('password'),
	};

	const response = await fetchLogin({ method: 'POST', body: authData, noToken: true });

	if (response.status === 422 || response.status === 401) {
		return response;
	}

	if (!response.ok) {
		throw json({ error: 'Could not authenticate user.' }, { status: 500 });
	}

	const resData = await response.json();
	setAuthToken(resData.token);

	return redirect('/');
}
