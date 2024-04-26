import { useRouteLoaderData } from 'react-router-dom';
import { Box, Container, Paper, Stack } from '@mui/material';

import {
	CONTAINER_STYLES,
	CONTENT_STYLES,
	PAPER_STYLES,
	STACK_STYLES,
} from './MovieDetail.styles';
import GoToButton from '../Layout/GoToButton';
import MovieForm from './MovieForm';

function MovieEditPage() {
	const id = 'movie-edit';
	const data = useRouteLoaderData(id);

	return (
		<Box sx={CONTENT_STYLES}>
			<Container sx={CONTAINER_STYLES}>
				<Stack sx={STACK_STYLES}>
					<Stack direction={'row'} justifyContent="space-between" spacing={2}>
						<GoToButton text="Return to Movies" url="/movies" />
						<GoToButton
							text="View movie"
							url={`/movies/${data.movie.id}`}
							type="view"
						/>
					</Stack>
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
					<GoToButton text="Return to Movies" url="/movies" />
				</Stack>
			</Container>
		</Box>
	);
}

export default MovieEditPage;
