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
} from './CharactersPage.styles';
import { fetchCharacters, fetchMovies } from '../../util/fetch';
import { FILTER_CHARACTER_OPTIONS } from '../../data/filters';
import TableData from '../Layout/TableData';
import { TABLE_HEADER_CHARACTERS } from '../../data/tableHeaders';

function CharactersPage() {
	const [valueFilter, setValueFilter] = useState(null);
	const [valueText, setValueText] = useState('');
	const [valueMovie, setValueMovie] = useState(null);
	const [search, setSearch] = useState(null);
	const [selectVisible, setSelectVisible] = useState(false);
	const [charactersData, setCharactersData] = useState(null);
	const [lastDeletion, setLastDeletion] = useState(null);
	const { characters, movies } = useLoaderData();
	const navigate = useNavigate();

	const characterActions = [
		{ id: 'view', action: handleViewCharacter },
		{ id: 'edit', action: handleEditCharacter },
		{ id: 'delete', action: handleDeleteRow },
	];

	function getSearchData() {
		let query = '';

		if (valueFilter) {
			if (valueFilter.id === 'movies' && valueMovie) {
				query = `?${valueFilter.id}=${valueMovie.id}`;
			}
			if (valueFilter.id !== 'movies' && valueText) {
				query = `?${valueFilter.id}=${valueText}`;
			}
		}

		setSearch(query);
	}

	function clearSearchData() {
		setValueFilter(null);
		setValueText('');
		setValueMovie(null);
		setSearch('');
	}

	function handleNewCharacter() {
		navigate(`/characters/new`);
	}

	function handleViewCharacter(characterId) {
		navigate(`/characters/${characterId}`);
	}

	function handleEditCharacter(characterId) {
		navigate(`/characters/${characterId}/edit`);
	}

	async function handleDeleteRow(characterId) {
		const proceed = window.confirm('Are you sure to delete this Character?');

		if (proceed) {
			const response = await fetchCharacters({
				query: `/${characterId}`,
				method: 'DELETE',
			});

			if (!response.ok) {
				alert('Could not delete character.');
			}

			setLastDeletion(characterId);
		}
	}

	useEffect(() => {
		async function fetchCharactersData() {
			try {
				const response = await fetchCharacters({ query: search || '' });
				const resData = await response.json();
				setCharactersData(resData.characters);
			} catch (err) {
				console.log(err);
			}
		}

		if (search !== null || lastDeletion !== null) {
			fetchCharactersData();
		}
	}, [search, lastDeletion]);

	return (
		<Container sx={CONTAINER_STYLES}>
			<Grid container sx={STACK_STYLES} spacing={1}>
				<Grid item>
					<Button
						variant="contained"
						startIcon={<AddIcon />}
						onClick={handleNewCharacter}
					>
						Create character
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
									options={FILTER_CHARACTER_OPTIONS}
									renderInput={(params) => (
										<TextField {...params} label="Filter by" />
									)}
									value={valueFilter}
									isOptionEqualToValue={(option, value) =>
										option.id === value.id
									}
									onChange={(event, newValue) => {
										setValueFilter(newValue);
										setSelectVisible(newValue?.id === 'movies');
									}}
								/>
							</Grid>
							{!selectVisible && (
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
								<Await resolve={movies}>
									{(loadedMovies) =>
										selectVisible && (
											<Grid item>
												<Autocomplete
													sx={AUTOCOMPLETE_MOVIE_STYLE}
													disablePortal
													size="small"
													options={loadedMovies}
													getOptionLabel={(option) => option.title}
													renderInput={(params) => (
														<TextField {...params} label="Movie" />
													)}
													value={valueMovie}
													isOptionEqualToValue={(option, value) =>
														option.id === value.id
													}
													onChange={(event, newValue) => {
														setValueMovie(newValue);
													}}
												/>
											</Grid>
										)
									}
								</Await>
							</Suspense>
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
					<TableData headers={TABLE_HEADER_CHARACTERS} message="Loading..." />
				}
			>
				<Await resolve={charactersData ?? characters}>
					{(loadedCharacters) => (
						<TableData
							headers={TABLE_HEADER_CHARACTERS}
							data={loadedCharacters}
							actions={characterActions}
						/>
					)}
				</Await>
			</Suspense>
		</Container>
	);
}

export default CharactersPage;

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
	return resData.characters;
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
	return resData.medias;
}

export function loader() {
	return defer({
		characters: loadCharacters(),
		movies: loadMovies(),
	});
}
