import {
	Avatar,
	IconButton,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { AVATAR_STYLES, TABLE_HEAD_STYLE, TABLE_STYLES } from './TableData.styles';

function TableData({ headers, data, message, actions }) {
	const actionsDictionary = {
		view: (id, action) => (
			<IconButton key={`view-${id}`} onClick={() => action(id)}>
				<Typography sx={{ color: 'success.main' }} lineHeight={0}>
					<VisibilityIcon color="inherit" />
				</Typography>
			</IconButton>
		),
		edit: (id, action) => (
			<IconButton key={`edit-${id}`} onClick={() => action(id)}>
				<Typography sx={{ color: 'primary.main' }} lineHeight={0}>
					<EditIcon color="inherit" />
				</Typography>
			</IconButton>
		),
		delete: (id, action) => (
			<IconButton key={`delete-${id}`} onClick={() => action(id)}>
				<Typography sx={{ color: 'error.main' }} lineHeight={0}>
					<DeleteIcon color="inherit" />
				</Typography>
			</IconButton>
		),
	};

	function renderRows(row) {
		return (
			<TableRow key={row.id}>
				{headers.map((header, indexCell) => (
					<TableCell key={`header-${row.id}-${indexCell}-cell`}>
						{header.id === 'image' && 
							<Avatar
								alt={row.name || row.title || "Avatar"}
								src={row[header.id]}
								sx={AVATAR_STYLES}
							/>
						}
						{header.id !== 'image' && row[header.id]}
					</TableCell>
				))}
				{actions && (
					<TableCell>
						<Stack direction="row">
							{actions.map((f) => {
								return actionsDictionary[f.id](row.id, f.action);
							})}
						</Stack>
					</TableCell>
				)}
			</TableRow>
		);
	}

	return (
		<TableContainer component={Paper}>
			<Table sx={TABLE_STYLES} aria-label="simple table">
				<TableHead>
					<TableRow>
						{headers.map((header) => (
							<TableCell sx={TABLE_HEAD_STYLE} key={header.id}>
								{header.label}
							</TableCell>
						))}
						{actions && <TableCell sx={TABLE_HEAD_STYLE}>Actions</TableCell>}
					</TableRow>
				</TableHead>
				<TableBody>
					{data && data.length > 0 && data.map((row) => renderRows(row))}
					{(!data || data.length === 0) && (
						<TableRow>
							<TableCell>{message || 'No data...'}</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default TableData;
