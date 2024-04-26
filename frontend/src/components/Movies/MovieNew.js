import { Box, Container, Paper, Stack } from '@mui/material';

import {
	CONTAINER_STYLES,
	CONTENT_STYLES,
	PAPER_STYLES,
	STACK_STYLES,
} from './MovieDetail.styles';
import GoToButton from '../Layout/GoToButton';
import MovieForm from './MovieForm';

function MovieNewPage() {
	const id = 'movie-new';

	return (
		<Box sx={CONTENT_STYLES}>
			<Container sx={CONTAINER_STYLES}>
				<Stack sx={STACK_STYLES}>
					<GoToButton text="Return to Movies" url="/movies" />
					<Box>
						<Paper elevation={4} sx={PAPER_STYLES}>
							<MovieForm title="Create New Movie" method="post" id={id} />
						</Paper>
					</Box>
					<GoToButton text="Return to Movies" url="/movies" />
				</Stack>
			</Container>
		</Box>
	);
}

export default MovieNewPage;
