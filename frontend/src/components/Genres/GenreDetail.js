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
	Stack,
	Typography,
} from '@mui/material';

import { fetchGenres } from '../../util/fetch';
import {
	AVATAR_STYLES,
	CHIP_TEXT_MOVIE,
	CHIP_TEXT_SERIE,
	CONTAINER_STYLES,
	CONTENT_STYLES,
	DETAILS_DESCRIPTION_STYLES,
	DETAILS_STACK_STYLES,
	DETAILS_SUBTITLE_STYLES,
	DETAILS_TITLE_STYLES,
	PAPER_STYLES,
	STACK_STYLES,
} from './GenreDetail.styles';
import GoToButton from '../Layout/GoToButton';

function GenreDetailPage() {
	const { genre } = useLoaderData();
	const navigate = useNavigate();

	function handleGoToMovie(id) {
		navigate(`/movies/${id}`);
	}

	return (
		<Box sx={CONTENT_STYLES}>
			<Container sx={CONTAINER_STYLES}>
				<Stack sx={STACK_STYLES}>
					<GoToButton text="Return to Genres" url="/genres" />
					<Box>
						<Paper elevation={4} sx={PAPER_STYLES}>
							<Suspense>
								<Await resolve={genre}>
									{(loadedGenre) => (
										<>
											<Typography sx={DETAILS_TITLE_STYLES}>
												Genre Details
											</Typography>
											<Stack sx={DETAILS_STACK_STYLES}>
												<Divider />
												<Grid container spacing={2}>
													<Grid item sx={{ width: '100%' }}>
														<Stack direction="row" justifyContent="center">
															<Avatar
																alt={loadedGenre.name}
																src={loadedGenre.image}
																sx={AVATAR_STYLES}
															/>
														</Stack>
													</Grid>
													<Grid item sx={{ width: '100%' }}>
														<Typography sx={DETAILS_SUBTITLE_STYLES}>
															Name
														</Typography>
														<Typography
															sx={DETAILS_DESCRIPTION_STYLES}
															gutterBottom
														>
															{loadedGenre.name}
														</Typography>
													</Grid>
													<Grid item sx={{ width: '100%' }}>
														<Typography
															sx={{
																...DETAILS_SUBTITLE_STYLES,
																mb: 1,
																fontWeight: 'bold',
															}}
														>
															Movies / Series
														</Typography>
														<Grid container spacing={1} justifyContent="center">
															{loadedGenre.media_genres.length === 0 && (
																<Typography>
																	No movies for this genre.
																</Typography>
															)}
															{loadedGenre.media_genres.map((movie) => (
																<Grid item key={movie.media_id}>
																	{movie.medias && (
																		<Chip
																			key={movie.media_id}
																			label={movie.medias.title}
																			sx={
																				movie.medias.id_media_type === 1
																					? CHIP_TEXT_MOVIE
																					: CHIP_TEXT_SERIE
																			}
																			onClick={() =>
																				handleGoToMovie(movie.media_id)
																			}
																		/>
																	)}
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
					<GoToButton text="Return to Genres" url="/genres" />
				</Stack>
			</Container>
		</Box>
	);
}

export default GenreDetailPage;

async function loadGenre(id) {
	const response = await fetchGenres({ query: `/${id}` });

	if (!response.ok) {
		throw json(
			{ message: 'Could not fetch genres.' },
			{
				status: 500,
			}
		);
	}

	const resData = await response.json();
	return resData.genre;
}

export async function loader({ request, params }) {
	const id = params.genreId;

	return defer({
		genre: await loadGenre(id),
	});
}
