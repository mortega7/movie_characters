import { getAuthToken } from './auth';

function getOptions(params) {
	const token = getAuthToken();
	const options = {
		method: params?.method || 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	if (params?.body) {
		options.body = JSON.stringify(params.body);
	}

	return options;
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
