import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	IconButton,
	Rating,
	Stack,
	Typography,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {
	CARD_ACTIONS_STYLES,
	CARD_CONTENT_STYLES,
	CARD_HEADER_STYLES,
	CARD_STYLES,
	DELETE_BUTTON_STYLES,
	EDIT_BUTTON_STYLES,
	GRID_CONTAINER_STYLES,
	GRID_ITEM_STYLES,
	VIEW_BUTTON_STYLES,
} from './GridData.styles';

function GridData({ loadedData, actions, type = 'characters' }) {
	const actionsDictionary = {
		view: (id, action) => (
			<IconButton key={`view-${id}`} onClick={() => action(id)}>
				<Typography sx={VIEW_BUTTON_STYLES} lineHeight={0}>
					<VisibilityIcon color="inherit" />
				</Typography>
			</IconButton>
		),
		edit: (id, action) => (
			<IconButton key={`edit-${id}`} onClick={() => action(id)}>
				<Typography sx={EDIT_BUTTON_STYLES} lineHeight={0}>
					<EditIcon color="inherit" />
				</Typography>
			</IconButton>
		),
		delete: (id, action) => (
			<IconButton key={`delete-${id}`} onClick={() => action(id)}>
				<Typography sx={DELETE_BUTTON_STYLES} lineHeight={0}>
					<DeleteIcon color="inherit" />
				</Typography>
			</IconButton>
		),
	};

	return (
		<Grid container spacing={2} sx={GRID_CONTAINER_STYLES}>
			{loadedData.map((data) => (
				<Grid item key={data.id} sx={GRID_ITEM_STYLES}>
					<Card variant="outlined" sx={CARD_STYLES}>
						{data.image && (
							<CardMedia
								component="img"
								height="200"
								alt={data.name || data.title || 'Image'}
								image={data.image}
							/>
						)}
						<CardContent sx={CARD_CONTENT_STYLES}>
							<Typography variant="h5" sx={CARD_HEADER_STYLES}>
								{data.name || data.title}
							</Typography>
							{type === 'movies' && data.score && (
								<Stack direction="row">
									<Rating value={data.score} readOnly />
								</Stack>
							)}
						</CardContent>
						{actions && (
							<CardActions sx={CARD_ACTIONS_STYLES}>
								{actions.map((f) => {
									return actionsDictionary[f.id](data.id, f.action);
								})}
							</CardActions>
						)}
					</Card>
				</Grid>
			))}
		</Grid>
	);
}

export default GridData;
