import { useEffect } from 'react';
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';
import { Grid } from '@mui/material';

import { getTokenDuration } from '../util/auth';
import { GRID_STYLES, CONTENT_STYLES } from '../components/Layout/Layout.styles';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

function RootLayout() {
	const token = useLoaderData();
	const submit = useSubmit();

	useEffect(() => {
		if (!token) {
			return;
		}

		if (token === 'EXPIRED_TOKEN') {
			submit(null, { action: '/logout', method: 'POST' });
			return;
		}

		const tokenDuration = getTokenDuration();

		setTimeout(() => {
			submit(null, { action: '/logout', method: 'POST' });
		}, tokenDuration);
	}, [token, submit]);

	return (
		<Grid container sx={GRID_STYLES}>
			<Grid item>
				<Header />
			</Grid>
			<Grid
				item
				container
				sx={{ ...CONTENT_STYLES, alignItems: 'start' }}
			>
				<Outlet />
			</Grid>
			<Grid item>
				<Footer />
			</Grid>
		</Grid>
	);
}

export default RootLayout;
