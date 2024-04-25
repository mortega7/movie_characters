import { Suspense } from 'react';
import {
	Await,
	defer,
	json,
	useLoaderData,
	useNavigate,
} from 'react-router-dom';
import { Container, Divider, Typography } from '@mui/material';

import {
	CONTAINER_STYLES,
	DIVIDER_STYLES,
	TITLE_STYLES,
} from './GenresPage.styles';
import { fetchGenres } from '../../util/fetch';
import GridData from '../Layout/GridData';

function GenresPage() {
	const { genres } = useLoaderData();
	const navigate = useNavigate();

	const genreActions = [{ id: 'view', action: handleViewGenre }];

	function handleViewGenre(genreId) {
		navigate(`/genres/${genreId}`);
	}

	return (
		<Container sx={CONTAINER_STYLES}>
			<Typography sx={TITLE_STYLES}>Genres</Typography>
			<Divider sx={DIVIDER_STYLES} />
			<Suspense fallback={<Typography paragraph>Loading...</Typography>}>
				<Await resolve={genres}>
					{(loadedGenres) => (
						<GridData loadedData={loadedGenres} actions={genreActions} />
					)}
				</Await>
			</Suspense>
		</Container>
	);
}

export default GenresPage;

async function loadGenres() {
	const response = await fetchGenres();

	if (!response.ok) {
		throw json(
			{ message: 'Could not fetch genres.' },
			{
				status: 500,
			}
		);
	}

	const resData = await response.json();
	return resData.genres;
}

export function loader() {
	return defer({
		genres: loadGenres(),
	});
}
