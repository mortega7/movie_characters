export const CONTAINER_STYLES = {
	padding: (theme) => theme.spacing(4, 1),
};

export const STACK_STYLES = {
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	mb: 4,

	'& .MuiInputBase-input': {
		minWidth: 150,
	},
};

export const STACK_STYLES_FILTER = {
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',

	'& .MuiInputBase-input': {
		minWidth: 150,
	},
};

export const FILTER_STYLES = {
	flexDirection: 'row',
	columns: 2,
	gap: 2,
};

export const AUTOCOMPLETE_TYPE_STYLE = {
	width: 150,
};

export const AUTOCOMPLETE_MOVIE_STYLE = {
	width: 300,
};

export const BUTTON_CLEAR = {
	color: 'red',
	borderColor: 'red',
	'&:hover': {
		borderColor: 'red',
	},
};

export const ERROR_STYLE = {
	color: 'red',
	textAlign: 'center',
	mb: (theme) => theme.spacing(2.5),
	fontSize: '1rem',
	border: '1px solid red',
	padding: (theme) => theme.spacing(1),
};
