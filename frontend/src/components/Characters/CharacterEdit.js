import { useRouteLoaderData } from 'react-router-dom';
import { Box, Container, Paper, Stack } from '@mui/material';

import {
	CONTAINER_STYLES,
	CONTENT_STYLES,
	PAPER_STYLES,
	STACK_STYLES,
} from './CharacterDetail.styles';
import GoToButton from '../Layout/GoToButton';
import CharacterForm from './CharacterForm';

function CharacterEditPage() {
	const id = 'character-edit';
	const data = useRouteLoaderData(id);

	return (
		<Box sx={CONTENT_STYLES}>
			<Container sx={CONTAINER_STYLES}>
				<Stack sx={STACK_STYLES}>
					<Stack direction={'row'} justifyContent="space-between" spacing={2}>
						<GoToButton text="Return to Characters" url="/characters" />
						<GoToButton
							text="View character"
							url={`/characters/${data.character.id}`}
							type="view"
						/>
					</Stack>
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
					<GoToButton text="Return to Characters" url="/characters" />
				</Stack>
			</Container>
		</Box>
	);
}

export default CharacterEditPage;
