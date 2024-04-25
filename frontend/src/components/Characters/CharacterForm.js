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
	Button,
	Checkbox,
	Divider,
	Grid,
	ListItemText,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from '@mui/material';

import {
	DETAILS_STACK_STYLES,
	DETAILS_TITLE_STYLES,
} from './CharacterDetail.styles';
import { ERROR_STYLE, STACK_STYLES_FILTER } from './CharactersPage.styles';
import { fetchCharacters } from '../../util/fetch';

function CharacterForm({ method, title, character, id }) {
	const data = useActionData(id);
	const { movies } = useLoaderData(id);
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';
	const [movieNames, setMovieNames] = useState([]);

	useEffect(() => {
		if (character) {
			const names = [];
			character.media_characters.map((media) => {
				names.push(media.medias.title);
				return true;
			});
			setMovieNames(names);
		}
	}, [character]);

	async function handleChange(event) {
		const value = event.target.value;
		setMovieNames(typeof value === 'string' ? value.split(',') : value);
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
						<Typography paragraph>Name *</Typography>
						<TextField
							variant="outlined"
							name="name"
							fullWidth
							size="small"
							required
							defaultValue={character ? character.name : ''}
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
							defaultValue={character ? character.image : ''}
						/>
					</Grid>
					<Grid item sx={{ width: '50%' }}>
						<Typography paragraph>Age *</Typography>
						<TextField
							variant="outlined"
							name="age"
							fullWidth
							size="small"
							required
							defaultValue={character ? character.age : ''}
						/>
					</Grid>
					<Grid item sx={{ width: '50%' }}>
						<Typography paragraph>Weight *</Typography>
						<TextField
							variant="outlined"
							name="weight"
							fullWidth
							size="small"
							required
							defaultValue={character ? character.weight : ''}
						/>
					</Grid>
					<Grid item sx={{ width: '100%' }}>
						<Typography paragraph>History *</Typography>
						<TextField
							variant="outlined"
							name="history"
							fullWidth
							multiline
							rows={2}
							size="small"
							required
							defaultValue={character ? character.history : ''}
						/>
					</Grid>
					<Grid item sx={{ width: '100%' }}>
						<Typography paragraph>Movies / Series</Typography>
						<Suspense>
							<Await resolve={movies}>
								{(loadedMovies) => (
									<Select
										name="movieNames"
										multiple
										fullWidth
										size="small"
										value={movieNames}
										onChange={handleChange}
										renderValue={(selected) => selected.join(', ')}
										MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
									>
										{loadedMovies.map((movie) => (
											<MenuItem key={movie.id} value={movie.title}>
												<Checkbox
													checked={movieNames.indexOf(movie.title) > -1}
												/>
												<ListItemText primary={movie.title} />
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

export default CharacterForm;

export async function action({ request, params }) {
	const method = request.method;
	const data = await request.formData();

	const movies = JSON.parse(localStorage.getItem('movies'));
	const movieNames = data.get('movieNames').split(',');
	const movieIds = [];

	movieNames.map((name) => {
		const movie = movies.find((m) => m.title === name);
		if (movie) {
			movieIds.push(movie.id);
		}
		return true;
	});

	const characterData = {
		characterInfo: {
			name: data.get('name'),
			image: data.get('image'),
			age: data.get('age'),
			weight: data.get('weight'),
			history: data.get('history'),
		},
		mediaInfo: movieIds,
	};

	const response = await fetchCharacters({
		query: method === 'PUT' ? `/${params.characterId}` : '',
		method: method,
		body: characterData,
	});

	if (response.status === 400) {
		return response;
	}

	if (!response.ok) {
		throw json({ message: 'Could not save character.' }, { status: 500 });
	}

	return redirect('/characters');
}
