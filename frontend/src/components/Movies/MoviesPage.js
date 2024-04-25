import { defer, json } from "react-router-dom";
import { fetchMovies } from "../../util/fetch";

async function loadMovies() {
	const response = await fetchMovies();

	if (!response.ok) {
		throw json(
			{ message: 'Could not fetch movies.' },
			{
				status: 500,
			}
		);
	}

	const resData = await response.json();
	return resData.medias;
}

export function loader() {
	return defer({
		movies: loadMovies(),
	});
}