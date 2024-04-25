import { Box, Container, Paper, Stack } from '@mui/material';

import {
	CONTAINER_STYLES,
	CONTENT_STYLES,
	PAPER_STYLES,
	STACK_STYLES,
} from './CharacterDetail.styles';
import GoBackButton from '../Layout/GoBackButton';
import CharacterForm from './CharacterForm';

function CharacterNewPage() {
	const id = 'character-new';

	return (
		<Box sx={CONTENT_STYLES}>
			<Container sx={CONTAINER_STYLES}>
				<Stack sx={STACK_STYLES}>
					<GoBackButton text="Return to Characters" url="/characters" />
					<Box>
						<Paper elevation={4} sx={PAPER_STYLES}>
							<CharacterForm
								title="Create New Character"
								method="post"
								id={id}
							/>
						</Paper>
					</Box>
					<GoBackButton text="Return to Characters" url="/characters" />
				</Stack>
			</Container>
		</Box>
	);
}

export default CharacterNewPage;
