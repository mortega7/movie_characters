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

import { fetchCharacters, fetchMovies } from '../../util/fetch';
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
} from './CharacterDetail.styles';
import GoToButton from '../Layout/GoToButton';

function CharacterDetailPage() {
	const { character } = useLoaderData();
	const navigate = useNavigate();

	function handleGoToMovie(id) {
		navigate(`/movies/${id}`);
	}

	return (
		<Box sx={CONTENT_STYLES}>
			<Container sx={CONTAINER_STYLES}>
				<Stack sx={STACK_STYLES}>
					<Stack direction={'row'} justifyContent="space-between" spacing={2}>
						<GoToButton text="Return to Characters" url="/characters" />
						<GoToButton
							text="Edit character"
							url={`/characters/${character.id}/edit`}
							type="edit"
						/>
					</Stack>
					<Box>
						<Paper elevation={4} sx={PAPER_STYLES}>
							<Suspense>
								<Await resolve={character}>
									{(loadedCharacter) => (
										<>
											<Typography sx={DETAILS_TITLE_STYLES}>
												Character Details
											</Typography>
											<Stack sx={DETAILS_STACK_STYLES}>
												<Divider />
												<Grid container spacing={2}>
													<Grid item sx={{ width: '100%' }}>
														<Stack direction="row" justifyContent="center">
															<Avatar
																alt={loadedCharacter.name}
																src={loadedCharacter.image}
																sx={AVATAR_STYLES}
															/>
														</Stack>
													</Grid>
													<Grid item sx={{ width: '33%' }}>
														<Typography sx={DETAILS_SUBTITLE_STYLES}>
															Name
														</Typography>
														<Typography
															sx={DETAILS_DESCRIPTION_STYLES}
															gutterBottom
														>
															{loadedCharacter.name}
														</Typography>
													</Grid>
													<Grid item sx={{ width: '33%' }}>
														<Typography sx={DETAILS_SUBTITLE_STYLES}>
															Age
														</Typography>
														<Typography
															sx={DETAILS_DESCRIPTION_STYLES}
															gutterBottom
														>
															{loadedCharacter.age}
														</Typography>
													</Grid>
													<Grid item sx={{ width: '33%' }}>
														<Typography sx={DETAILS_SUBTITLE_STYLES}>
															Weight
														</Typography>
														<Typography
															sx={DETAILS_DESCRIPTION_STYLES}
															gutterBottom
														>
															{loadedCharacter.weight}
														</Typography>
													</Grid>
													<Grid item sx={{ width: '100%' }}>
														<Typography sx={DETAILS_SUBTITLE_STYLES}>
															History
														</Typography>
														<Typography
															sx={DETAILS_DESCRIPTION_STYLES}
															gutterBottom
														>
															{loadedCharacter.history}
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
															{loadedCharacter.media_characters.map(
																(media_character) => (
																	<Grid item key={media_character.media_id}>
																		{media_character.medias && (
																			<Chip
																				key={media_character.media_id}
																				label={media_character.medias.title}
																				sx={
																					media_character.medias
																						.id_media_type === 1
																						? CHIP_TEXT_MOVIE
																						: CHIP_TEXT_SERIE
																				}
																				onClick={() =>
																					handleGoToMovie(
																						media_character.media_id
																					)
																				}
																			/>
																		)}
																	</Grid>
																)
															)}
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
					<GoToButton text="Return to Characters" url="/characters" />
				</Stack>
			</Container>
		</Box>
	);
}

export default CharacterDetailPage;

async function loadCharacter(id) {
	const response = await fetchCharacters({ query: `/${id}` });

	if (!response.ok) {
		throw json(
			{ message: 'Could not fetch details for selected character.' },
			{
				status: 500,
			}
		);
	}

	const resData = await response.json();
	return resData.character;
}

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
	const movies = resData.medias.map((m) => {
		return { id: m.id, title: m.title };
	});
	localStorage.setItem('movies', JSON.stringify(movies));
	return resData.medias;
}

export async function loader({ request, params }) {
	const id = params.characterId;

	return defer({
		character: await loadCharacter(id),
		movies: await loadMovies(),
	});
}
