import { getAuthToken } from './auth';

function getOptions(params) {
	const options = {
		method: params?.method || 'GET',
	};

	if (params?.noToken) {
		options.headers = {
			'Content-Type': 'application/json',
		};
	} else {
		const token = getAuthToken();
		options.headers = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		};
	}

	if (params?.body) {
		options.body = JSON.stringify(params.body);
	}

	return options;
}

export async function fetchLogin(params) {
	const options = getOptions(params);

	const response = await fetch(
		`${process.env.REACT_APP_API_URL}/auth/login`,
		options
	);

	return response;
}

export async function fetchCharacters(params) {
	const options = getOptions(params);

	const response = await fetch(
		`${process.env.REACT_APP_API_URL}/characters${params?.query || ''}`,
		options
	);

	return response;
}

export async function fetchMovies(params) {
	const options = getOptions(params);

	const response = await fetch(
		`${process.env.REACT_APP_API_URL}/movies${params?.query || ''}`,
		options
	);

	return response;
}

export async function fetchGenres(params) {
	const options = getOptions(params);

	const response = await fetch(
		`${process.env.REACT_APP_API_URL}/genres${params?.query || ''}`,
		options
	);

	return response;
}

export async function fetchMediaTypes(params) {
	const options = getOptions(params);

	const response = await fetch(
		`${process.env.REACT_APP_API_URL}/mediatypes${params?.query || ''}`,
		options
	);

	return response;
}
