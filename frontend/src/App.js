import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootPage from './pages/Root';
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import LoginPage, { action as loginAction } from './pages/Login';
import { action as logoutAction } from './pages/Logout';
import { checkAuthLoader, getAuthToken } from './util/auth';
import CharactersPage, {
	loader as charactersLoader,
} from './components/Characters/CharactersPage';
import CharacterDetailPage, {
	loader as characterDetailLoader,
} from './components/Characters/CharacterDetail';
import CharacterNewPage from './components/Characters/CharacterNew';
import CharacterEditPage from './components/Characters/CharacterEdit';
import { action as manipulateCharacterAction } from './components/Characters/CharacterForm';
import MoviesPage, {
	loader as moviesLoader,
} from './components/Movies/MoviesPage';
import MovieDetailPage, {
	loader as movieDetailLoader,
} from './components/Movies/MovieDetail';
import MovieNewPage from './components/Movies/MovieNew';
import MovieEditPage from './components/Movies/MovieEdit';
import { action as manipulateMovieAction } from './components/Movies/MovieForm';
import GenresPage, {
	loader as genresLoader,
} from './components/Genres/GenresPage';
import GenreDetailPage, {
	loader as genreDetailLoader,
} from './components/Genres/GenreDetail';

const router = createBrowserRouter([
	{
		id: 'root',
		path: '/',
		element: <RootPage />,
		errorElement: <ErrorPage />,
		loader: getAuthToken,
		children: [
			{ index: true, element: <HomePage /> },
			{
				path: 'characters',
				element: <RootLayout />,
				loader: checkAuthLoader,
				children: [
					{
						index: true,
						element: <CharactersPage />,
						loader: charactersLoader,
					},
					{
						path: ':characterId',
						id: 'character-detail',
						children: [
							{
								index: true,
								element: <CharacterDetailPage />,
								loader: characterDetailLoader,
							},
							{
								path: 'edit',
								id: 'character-edit',
								element: <CharacterEditPage />,
								action: manipulateCharacterAction,
								loader: characterDetailLoader,
							},
						],
					},
					{
						path: 'new',
						id: 'character-new',
						element: <CharacterNewPage />,
						action: manipulateCharacterAction,
						loader: moviesLoader,
					},
				],
			},
			{
				path: 'movies',
				element: <RootLayout />,
				loader: checkAuthLoader,
				children: [
					{
						index: true,
						element: <MoviesPage />,
						loader: moviesLoader,
					},
					{
						path: ':movieId',
						id: 'movie-detail',
						children: [
							{
								index: true,
								element: <MovieDetailPage />,
								loader: movieDetailLoader,
							},
							{
								path: 'edit',
								id: 'movie-edit',
								element: <MovieEditPage />,
								action: manipulateMovieAction,
								loader: movieDetailLoader,
							},
						],
					},
					{
						path: 'new',
						id: 'movie-new',
						element: <MovieNewPage />,
						action: manipulateMovieAction,
						loader: moviesLoader,
					},
				],
			},
			{
				path: 'genres',
				element: <RootLayout />,
				loader: checkAuthLoader,
				children: [
					{
						index: true,
						element: <GenresPage />,
						loader: genresLoader,
					},
					{
						path: ':genreId',
						element: <GenreDetailPage />,
						loader: genreDetailLoader,
					},
				],
			},
			{
				path: 'login',
				element: <LoginPage />,
				action: loginAction,
			},
			{
				path: 'logout',
				action: logoutAction,
				exact: true,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
