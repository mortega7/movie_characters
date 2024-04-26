import { Box, Container, Typography } from '@mui/material';

function HomePage() {
	return (
		<Box>
			<Container sx={{ padding: (theme) => theme.spacing(10, 1) }}>
				<Typography variant="h3" align="center" gutterBottom>
					Welcome to Movies Universe!
				</Typography>
				<Typography variant="h5" align="center" gutterBottom>
					Browse all our amazing catalog of movies, series, and characters!
				</Typography>
				<Box sx={{ textAlign: 'center' }}>
					<img
						src="/images/movies2.jpg"
						alt="Movies Universe"
						loading="lazy"
						width="75%"
					/>
				</Box>
			</Container>
		</Box>
	);
}

export default HomePage;
