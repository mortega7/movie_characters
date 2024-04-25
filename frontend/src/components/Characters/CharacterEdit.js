import { Box, Container, Paper, Stack } from '@mui/material';

import {
	CONTAINER_STYLES,
	CONTENT_STYLES,
	PAPER_STYLES,
	STACK_STYLES,
} from './CharacterDetail.styles';
import GoBackButton from '../Layout/GoBackButton';
import CharacterForm from './CharacterForm';
import { useRouteLoaderData } from 'react-router-dom';

function CharacterEditPage() {
	const id = 'character-edit';
	const data = useRouteLoaderData(id);

	return (
		<Box sx={CONTENT_STYLES}>
			<Container sx={CONTAINER_STYLES}>
				<Stack sx={STACK_STYLES}>
					<GoBackButton text="Return to Characters" url="/characters" />
					<Box>
						<Paper elevation={4} sx={PAPER_STYLES}>
							<CharacterForm
								title="Edit Character"
								method="put"
								id={id}
								character={data.character}
							/>
						</Paper>
					</Box>
					<GoBackButton text="Return to Characters" url="/characters" />
				</Stack>
			</Container>
		</Box>
	);
}

export default CharacterEditPage;
