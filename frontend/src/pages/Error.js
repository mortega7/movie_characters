import { useRouteError } from 'react-router-dom';
import { Typography } from '@mui/material';

import Layout from '../components/Layout/Layout';

function ErrorPage() {
	const error = useRouteError();

	let title = 'An error occurred!';
	let message = 'Something went wrong!';

	if (error.status === 500) {
		message = error.data.message;
	}

	if (error.status === 404) {
		title = 'Not found!';
		message = 'Could not find resource or page.';
	}

	return (
		<>
			<Layout centerItems>
				<div>
					<Typography variant="h4" align="center" gutterBottom>
						{title}
					</Typography>
					<Typography paragraph align="center">
						{message}
					</Typography>
				</div>
			</Layout>
		</>
	);
}

export default ErrorPage;
