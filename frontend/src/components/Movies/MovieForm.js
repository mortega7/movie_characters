import { Suspense, useEffect, useState } from 'react';
import {
	Form,
	useNavigation,
	useActionData,
	json,
	redirect,
	useLoaderData,
	Await,
} from 'react-router-dom';
import {
	Autocomplete,
	Button,
	Checkbox,
	Divider,
	Grid,
	ListItemText,
	MenuItem,
	Rating,
	Select,
	Stack,
	TextField,
	Typography,
} from '@mui/material';

import {
	DETAILS_STACK_STYLES,
	DETAILS_TITLE_STYLES,
} from './MovieDetail.styles';
import { ERROR_STYLE, STACK_STYLES_FILTER } from './MoviesPage.styles';
import { fetchMovies } from '../../util/fetch';

function MovieForm({ method, title, movie, id }) {
	const data = useActionData(id);
	const { mediaTypes, characters, genres } = useLoaderData(id);
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';
	const [characterNames, setCharacterNames] = useState([]);
	const [genreNames, setGenreNames] = useState([]);
	const [valueMediaType, setValueMediaType] = useState(null);
	const [valueIdMediaType, setValueIdMediaType] = useState('');

	useEffect(() => {
		if (movie) {
			const names = [];
			movie.media_characters.map((media) => {
				names.push(media.character.name);
				return true;
			});
			setCharacterNames(names);

			const genres = [];
			movie.media_genres.map((media) => {
				genres.push(media.genre.name);
				return true;
			});
			setGenreNames(genres);

			setValueIdMediaType(movie.id_media_type);
			setValueMediaType(movie.media_types);
		}
	}, [movie]);

	async function handleChangeCharacter(event) {
		const value = event.target.value;
		setCharacterNames(typeof value === 'string' ? value.split(',') : value);
	}

	async function handleChangeGenre(event) {
		const value = event.target.value;
		setGenreNames(typeof value === 'string' ? value.split(',') : value);
	}

	return (
		<Form method={method}>
			<Typography sx={DETAILS_TITLE_STYLES}>{title}</Typography>
			<Stack sx={DETAILS_STACK_STYLES}>
				<Divider />
				{data && data.error && (
					<Typography sx={ERROR_STYLE}>{data.error}</Typography>
				)}
				<Grid container spacing={2} sx={STACK_STYLES_FILTER}>
					<Grid item sx={{ width: '100%' }}>
						<Typography paragraph>Title *</Typography>
						<TextField
							variant="outlined"
							name="title"
							fullWidth
							size="small"
							required
							defaultValue={movie ? movie.title : ''}
						/>
					</Grid>
					<Grid item sx={{ width: '100%' }}>
						<Typography paragraph>Image URL *</Typography>
						<TextField
							variant="outlined"
							name="image"
							type="url"
							fullWidth
							size="small"
							required
							defaultValue={movie ? movie.image : ''}
						/>
					</Grid>
					<Grid item sx={{ width: '50%' }}>
						<Typography paragraph>Media Type *</Typography>
						<Suspense>
							<Await resolve={mediaTypes}>
								{(loadedMediaTypes) => (
									<>
										<Autocomplete
											disablePortal
											fullWidth
											required
											size="small"
											options={loadedMediaTypes}
											getOptionLabel={(mediaType) => mediaType.name}
											renderInput={(params) => (
												<TextField {...params} name="nameMediaType" />
											)}
											value={valueMediaType}
											isOptionEqualToValue={(option, value) =>
												option.id === value.id
											}
											onChange={(event, newValue) => {
												setValueMediaType(newValue);
												setValueIdMediaType(newValue.id);
											}}
										/>
										<TextField
											sx={{ display: 'none' }}
											hiddenLabel
											type="hidden"
											value={valueIdMediaType}
											name="idMediaType"
										/>
									</>
								)}
							</Await>
						</Suspense>
					</Grid>
					<Grid item sx={{ width: '50%' }}>
						<Typography paragraph>Creation Date *</Typography>
						<TextField
							variant="outlined"
							name="creationDate"
							fullWidth
							size="small"
							required
							type="date"
							defaultValue={movie ? movie.creationDate : ''}
						/>
					</Grid>
					<Grid item sx={{ width: '100%' }}>
						<Typography paragraph>Score *</Typography>
						<Rating
							name="score"
							defaultValue={movie ? movie.score : 0}
							required
							sx={{ fontSize: '3rem' }}
						/>
					</Grid>
					<Grid item sx={{ width: '100%' }}>
						<Typography paragraph>Characters *</Typography>
						<Suspense>
							<Await resolve={characters}>
								{(loadedCharacters) => (
									<Select
										name="characterNames"
										multiple
										fullWidth
										required
										size="small"
										value={characterNames}
										onChange={handleChangeCharacter}
										renderValue={(selected) => selected.join(', ')}
										MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
									>
										{loadedCharacters.map((character) => (
											<MenuItem key={character.id} value={character.name}>
												<Checkbox
													checked={characterNames.indexOf(character.name) > -1}
												/>
												<ListItemText primary={character.name} />
											</MenuItem>
										))}
									</Select>
								)}
							</Await>
						</Suspense>
					</Grid>
					<Grid item sx={{ width: '100%' }}>
						<Typography paragraph>Genres *</Typography>
						<Suspense>
							<Await resolve={genres}>
								{(loadedGenres) => (
									<Select
										name="genreNames"
										multiple
										fullWidth
										required
										size="small"
										value={genreNames}
										onChange={handleChangeGenre}
										renderValue={(selected) => selected.join(', ')}
										MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
									>
										{loadedGenres.map((genre) => (
											<MenuItem key={genre.id} value={genre.name}>
												<Checkbox
													checked={genreNames.indexOf(genre.name) > -1}
												/>
												<ListItemText primary={genre.name} />
											</MenuItem>
										))}
									</Select>
								)}
							</Await>
						</Suspense>
					</Grid>
					<Grid item sx={{ width: '100%', textAlign: 'center', mt: 2 }}>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							size="large"
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Submitting...' : 'Save'}
						</Button>
					</Grid>
				</Grid>
			</Stack>
		</Form>
	);
}

export default MovieForm;

export async function action({ request, params }) {
	const method = request.method;
	const data = await request.formData();

	const characters = JSON.parse(localStorage.getItem('characters'));
	const characterNames = data.get('characterNames').split(',');
	const characterIds = [];

	characterNames.map((name) => {
		const character = characters.find((m) => m.name === name);
		if (character) {
			characterIds.push(character.id);
		}
		return true;
	});

	const genres = JSON.parse(localStorage.getItem('genres'));
	const genreNames = data.get('genreNames').split(',');
	const genreIds = [];

	genreNames.map((name) => {
		const genre = genres.find((m) => m.name === name);
		if (genre) {
			genreIds.push(genre.id);
		}
		return true;
	});

	const movieData = {
		mediaInfo: {
			id_media_type: data.get('idMediaType'),
			title: data.get('title'),
			image: data.get('image'),
			creationDate: data.get('creationDate'),
			score: data.get('score'),
		},
		characterInfo: characterIds,
		genreInfo: genreIds,
	};

	const response = await fetchMovies({
		query: method === 'PUT' ? `/${params.movieId}` : '',
		method: method,
		body: movieData,
	});

	if (response.status === 400) {
		return response;
	}

	if (!response.ok) {
		throw json({ message: 'Could not save movie.' }, { status: 500 });
	}

	return redirect('/movies');
}
