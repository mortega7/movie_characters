import { Box, Container, Paper, Stack } from '@mui/material';

import {
	CONTAINER_STYLES,
	CONTENT_STYLES,
	PAPER_STYLES,
	STACK_STYLES,
} from './MovieDetail.styles';
import GoBackButton from '../Layout/GoBackButton';
import MovieForm from './MovieForm';
import { useRouteLoaderData } from 'react-router-dom';

function MovieEditPage() {
	const id = 'movie-edit';
	const data = useRouteLoaderData(id);

	return (
		<Box sx={CONTENT_STYLES}>
			<Container sx={CONTAINER_STYLES}>
				<Stack sx={STACK_STYLES}>
					<GoBackButton text="Return to Movies" url="/movies" />
					<Box>
						<Paper elevation={4} sx={PAPER_STYLES}>
							<MovieForm
								title="Edit Movie"
								method="put"
								id={id}
								movie={data.movie}
							/>
						</Paper>
					</Box>
					<GoBackButton text="Return to Movies" url="/movies" />
				</Stack>
			</Container>
		</Box>
	);
}

export default MovieEditPage;
