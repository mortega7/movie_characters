import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import LoginPage, { action as loginAction } from './pages/Login';
import { action as logoutAction } from './pages/Logout';
import { checkAuthLoader, getAuthToken } from './util/auth';
import CharactersRootLayout from './pages/CharactersRoot';
import CharactersPage, {
	loader as charactersLoader,
} from './components/Characters/CharactersPage';
import CharacterDetailPage, {
	loader as characterDetailLoader,
} from './components/Characters/CharacterDetail';
import CharacterNewPage from './components/Characters/CharacterNew';
import CharacterEditPage from './components/Characters/CharacterEdit';
import {
	loader as moviesLoader,
} from './components/Movies/MoviesPage';
import { action as manipulateCharacterAction } from './components/Characters/CharacterForm';

const router = createBrowserRouter([
	{
		id: 'root',
		path: '/',
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		loader: getAuthToken,
		children: [
			{ index: true, element: <HomePage /> },
			{
				path: 'characters',
				element: <CharactersRootLayout />,
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
