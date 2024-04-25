import { Box, Container, Typography } from '@mui/material';

function HomePage() {
	return (
		<Box>
			<Container sx={{ padding: (theme) => theme.spacing(10, 1) }}>
				<Typography variant="h3" align="center" gutterBottom>
					Welcome to Movies Universe!
				</Typography>
				<Typography variant="h5" align="center">
					Browse all our amazing catalog of movies, series, and characters!
				</Typography>
			</Container>
		</Box>
	);
}

export default HomePage;
