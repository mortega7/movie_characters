import { Suspense, useEffect, useState } from 'react';
import {
	Await,
	defer,
	json,
	useLoaderData,
	useNavigate,
} from 'react-router-dom';
import {
	Autocomplete,
	Button,
	Container,
	Grid,
	MenuItem,
	Stack,
	TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

import {
	AUTOCOMPLETE_MOVIE_STYLE,
	AUTOCOMPLETE_TYPE_STYLE,
	BUTTON_CLEAR,
	CONTAINER_STYLES,
	FILTER_STYLES,
	STACK_STYLES,
	STACK_STYLES_FILTER,
} from './MoviesPage.styles';
import { fetchCharacters, fetchGenres, fetchMediaTypes, fetchMovies } from '../../util/fetch';
import { FILTER_MOVIE_OPTIONS } from '../../data/filters';
import TableData from '../Layout/TableData';
import { TABLE_HEADER_MOVIES } from '../../data/tableHeaders';

function MoviesPage() {
	const [valueFilter, setValueFilter] = useState(null);
	const [valueText, setValueText] = useState('');
	const [valueGenre, setValueGenre] = useState(null);
	const [valueCreationDate, setValueCreationDate] = useState('ASC');
	const [search, setSearch] = useState(null);
	const [selectGenreVisible, setSelectGenreVisible] = useState(false);
	const [selectCreationDateVisible, setSelectCreationDateVisible] =
		useState(false);
	const [moviesData, setMoviesData] = useState(null);
	const [lastDeletion, setLastDeletion] = useState(null);
	const { movies, genres } = useLoaderData();
	const navigate = useNavigate();

	const movieActions = [
		{ id: 'view', action: handleViewMovie },
		{ id: 'edit', action: handleEditMovie },
		{ id: 'delete', action: handleDeleteRow },
	];

	function getSearchData() {
		let query = '';

		if (valueFilter) {
			if (valueFilter.id === 'genre' && valueGenre) {
				query = `?${valueFilter.id}=${valueGenre.id}`;
			}
			if (valueFilter.id !== 'genre') {
				if (valueText) {
					query = `?${valueFilter.id}=${valueText}`;
				}

				if (valueFilter.id === 'order') {
					query = `?${valueFilter.id}=${valueCreationDate}`;
				}
			}
		}

		setSearch(query);
	}

	function clearSearchData() {
		setValueFilter(null);
		setValueText('');
		setValueGenre(null);
		setSearch('');
	}

	function handleNewMovie() {
		navigate(`/movies/new`);
	}

	function handleViewMovie(movieId) {
		navigate(`/movies/${movieId}`);
	}

	function handleEditMovie(movieId) {
		navigate(`/movies/${movieId}/edit`);
	}

	async function handleDeleteRow(movieId) {
		const proceed = window.confirm('Are you sure to delete this Movie?');

		if (proceed) {
			const response = await fetchMovies({
				query: `/${movieId}`,
				method: 'DELETE',
			});

			if (!response.ok) {
				alert('Could not delete movie.');
			}

			setLastDeletion(movieId);
		}
	}

	useEffect(() => {
		async function fetchMoviesData() {
			try {
				const response = await fetchMovies({ query: search || '' });
				const resData = await response.json();
				setMoviesData(resData.medias);
			} catch (err) {
				console.log(err);
			}
		}

		if (search !== null || lastDeletion !== null) {
			fetchMoviesData();
		}
	}, [search, lastDeletion]);

	return (
		<Container sx={CONTAINER_STYLES}>
			<Grid container sx={STACK_STYLES} spacing={1}>
				<Grid item>
					<Button
						variant="contained"
						startIcon={<AddIcon />}
						onClick={handleNewMovie}
					>
						Create movie
					</Button>
				</Grid>
				<Grid item>
					<Stack sx={FILTER_STYLES}>
						<Grid container sx={STACK_STYLES_FILTER} spacing={1}>
							<Grid item>
								<Autocomplete
									sx={AUTOCOMPLETE_TYPE_STYLE}
									disablePortal
									size="small"
									options={FILTER_MOVIE_OPTIONS}
									renderInput={(params) => (
										<TextField {...params} label="Filter by" />
									)}
									value={valueFilter}
									isOptionEqualToValue={(option, value) =>
										option.id === value.id
									}
									onChange={(event, newValue) => {
										setValueFilter(newValue);
										setSelectGenreVisible(newValue?.id === 'genre');
										setSelectCreationDateVisible(newValue?.id === 'order');
									}}
								/>
							</Grid>
							{!selectGenreVisible && !selectCreationDateVisible && (
								<Grid item>
									<TextField
										label="Search"
										variant="outlined"
										size="small"
										value={valueText}
										onChange={(e) => setValueText(e.target.value)}
									/>
								</Grid>
							)}
							<Suspense>
								<Await resolve={genres}>
									{(loadedGenres) =>
										selectGenreVisible && (
											<Grid item>
												<Autocomplete
													sx={AUTOCOMPLETE_MOVIE_STYLE}
													disablePortal
													size="small"
													options={loadedGenres}
													getOptionLabel={(option) => option.name}
													renderInput={(params) => (
														<TextField {...params} label="Genre" />
													)}
													value={valueGenre}
													isOptionEqualToValue={(option, value) =>
														option.id === value.id
													}
													onChange={(event, newValue) => {
														setValueGenre(newValue);
													}}
												/>
											</Grid>
										)
									}
								</Await>
							</Suspense>
							{selectCreationDateVisible && (
								<Grid item>
									<TextField
										label="Creation Date"
										select
										variant="outlined"
										size="small"
										value={valueCreationDate}
										onChange={(e) => setValueCreationDate(e.target.value)}
									>
										<MenuItem value="ASC">ASC</MenuItem>
										<MenuItem value="DESC">DESC</MenuItem>
									</TextField>
								</Grid>
							)}
							<Grid item>
								<Button
									variant="contained"
									onClick={() => getSearchData()}
									title="Search"
								>
									<SearchIcon />
								</Button>
							</Grid>
							<Grid item>
								<Button
									variant="outlined"
									onClick={() => clearSearchData()}
									title="Clear search"
									sx={BUTTON_CLEAR}
								>
									<ClearIcon />
								</Button>
							</Grid>
						</Grid>
					</Stack>
				</Grid>
			</Grid>
			<Suspense
				fallback={
					<TableData headers={TABLE_HEADER_MOVIES} message="Loading..." />
				}
			>
				<Await resolve={moviesData ?? movies}>
					{(loadedMovies) => (
						<TableData
							headers={TABLE_HEADER_MOVIES}
							data={loadedMovies}
							actions={movieActions}
						/>
					)}
				</Await>
			</Suspense>
		</Container>
	);
}

export default MoviesPage;

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

export function loader() {
	return defer({
		movies: loadMovies(),
		characters: loadCharacters(),
		genres: loadGenres(),
		mediaTypes: loadMediaTypes(),
	});
}
