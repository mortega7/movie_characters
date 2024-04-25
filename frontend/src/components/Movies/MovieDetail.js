import { Suspense } from 'react';
import {
	Await,
	defer,
	json,
	useLoaderData,
	useNavigate,
} from 'react-router-dom';
import {
	Avatar,
	Box,
	Chip,
	Container,
	Divider,
	Grid,
	Paper,
	Rating,
	Stack,
	Typography,
} from '@mui/material';

import {
	fetchCharacters,
	fetchGenres,
	fetchMediaTypes,
	fetchMovies,
} from '../../util/fetch';
import {
	AVATAR_STYLES,
	CHIP_TEXT,
	CONTAINER_STYLES,
	CONTENT_STYLES,
	DETAILS_DESCRIPTION_STYLES,
	DETAILS_STACK_STYLES,
	DETAILS_SUBTITLE_STYLES,
	DETAILS_TITLE_STYLES,
	PAPER_STYLES,
	STACK_STYLES,
} from './MovieDetail.styles';
import GoBackButton from '../Layout/GoBackButton';

function MovieDetailPage() {
	const { movie } = useLoaderData();
	const navigate = useNavigate();

	function handleGoToCharacter(id) {
		navigate(`/characters/${id}`);
	}

	function handleGoToGenre(id) {
		navigate(`/genres/${id}`);
	}

	return (
		<Box sx={CONTENT_STYLES}>
			<Container sx={CONTAINER_STYLES}>
				<Stack sx={STACK_STYLES}>
					<GoBackButton text="Return to Movies" url="/movies" />
					<Box>
						<Paper elevation={4} sx={PAPER_STYLES}>
							<Suspense>
								<Await resolve={movie}>
									{(loadedMovie) => (
										<>
											<Typography sx={DETAILS_TITLE_STYLES}>
												Movie Details
											</Typography>
											<Stack sx={DETAILS_STACK_STYLES}>
												<Divider />
												<Grid container spacing={2}>
													<Grid item sx={{ width: '100%' }}>
														<Stack direction="row" justifyContent="center">
															<Avatar
																alt={loadedMovie.title}
																src={loadedMovie.image}
																sx={AVATAR_STYLES}
															/>
														</Stack>
													</Grid>
													<Grid item sx={{ width: '33%' }}>
														<Typography sx={DETAILS_SUBTITLE_STYLES}>
															Title
														</Typography>
														<Typography
															sx={DETAILS_DESCRIPTION_STYLES}
															gutterBottom
														>
															{loadedMovie.title}
														</Typography>
													</Grid>
													<Grid item sx={{ width: '33%' }}>
														<Typography sx={DETAILS_SUBTITLE_STYLES}>
															Creation Date
														</Typography>
														<Typography
															sx={DETAILS_DESCRIPTION_STYLES}
															gutterBottom
														>
															{loadedMovie.creationDate}
														</Typography>
													</Grid>
													<Grid item sx={{ width: '33%' }}>
														<Typography sx={DETAILS_SUBTITLE_STYLES}>
															Type
														</Typography>
														<Typography
															sx={DETAILS_DESCRIPTION_STYLES}
															gutterBottom
														>
															{loadedMovie.media_types.name}
														</Typography>
													</Grid>
													<Grid item sx={{ width: '100%' }}>
														<Typography
															sx={{
																...DETAILS_SUBTITLE_STYLES,
																fontWeight: 'bold',
															}}
														>
															Score
														</Typography>
														<Stack direction="row" justifyContent="center">
															<Rating
																value={loadedMovie.score}
																readOnly
																sx={{ fontSize: '3rem' }}
															/>
														</Stack>
													</Grid>
													<Grid item sx={{ width: '100%' }}>
														<Typography
															sx={{
																...DETAILS_SUBTITLE_STYLES,
																mb: 1,
																fontWeight: 'bold',
															}}
														>
															Characters
														</Typography>
														<Grid container spacing={1} justifyContent="center">
															{loadedMovie.media_characters.map(
																(media_character) => (
																	<Grid item key={media_character.character_id}>
																		<Chip
																			key={media_character.character_id}
																			label={media_character.character.name}
																			sx={CHIP_TEXT}
																			onClick={() =>
																				handleGoToCharacter(
																					media_character.character_id
																				)
																			}
																		/>
																	</Grid>
																)
															)}
														</Grid>
													</Grid>
													<Grid item sx={{ width: '100%' }}>
														<Typography
															sx={{
																...DETAILS_SUBTITLE_STYLES,
																mb: 1,
																fontWeight: 'bold',
															}}
														>
															Genres
														</Typography>
														<Grid container spacing={1} justifyContent="center">
															{loadedMovie.media_genres.map((media_genre) => (
																<Grid item key={media_genre.genre_id}>
																	<Chip
																		key={media_genre.genre_id}
																		label={media_genre.genre.name}
																		sx={CHIP_TEXT}
																		onClick={() =>
																			handleGoToGenre(media_genre.genre_id)
																		}
																	/>
																</Grid>
															))}
														</Grid>
													</Grid>
												</Grid>
											</Stack>
										</>
									)}
								</Await>
							</Suspense>
						</Paper>
					</Box>
					<GoBackButton text="Return to Movies" url="/movies" />
				</Stack>
			</Container>
		</Box>
	);
}

export default MovieDetailPage;

async function loadMovie(id) {
	const response = await fetchMovies({ query: `/${id}` });

	if (!response.ok) {
		throw json(
			{ message: 'Could not fetch details for selected movie.' },
			{
				status: 500,
			}
		);
	}

	const resData = await response.json();
	return resData.medias;
}

async function loadCharacters() {
	const response = await fetchCharacters();

	if (!response.ok) {
		throw json(
			{ message: 'Could not fetch characters.' },
			{
				status: 500,
			}
		);
	}

	const resData = await response.json();
	const characters = resData.characters.map((c) => {
		return { id: c.id, name: c.name };
	});
	localStorage.setItem('characters', JSON.stringify(characters));

	return resData.characters;
}

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
	const genres = resData.genres.map((g) => {
		return { id: g.id, name: g.name };
	});
	localStorage.setItem('genres', JSON.stringify(genres));

	return resData.genres;
}

async function loadMediaTypes() {
	const response = await fetchMediaTypes();

	if (!response.ok) {
		throw json(
			{ message: 'Could not fetch media types.' },
			{
				status: 500,
			}
		);
	}

	const resData = await response.json();
	return resData.media_types;
}

export async function loader({ request, params }) {
	const id = params.movieId;

	return defer({
		movie: await loadMovie(id),
		characters: await loadCharacters(),
		genres: await loadGenres(),
		mediaTypes: await loadMediaTypes(),
	});
}
