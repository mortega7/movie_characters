import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import LoginPage, { action as loginAction } from './pages/Login';
import { action as logoutAction } from './pages/Logout';
import { getAuthToken } from './util/auth';

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
				path: 'login',
				element: <LoginPage />,
				action: loginAction,
			},
			{
				path: 'logout',
				action: logoutAction,
				exact: true
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
