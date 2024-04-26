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

export const BUTTON_CREATE = {
	mb: {
		xs: 2,
		sm: 0,
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

export const TEXTFIELD_FILTER_STYLE = {
	width: {
		xs: 150,
		md: 200,
		lg: 300,
	},
};

export const SELECT_ORDER_FILTER_STYLE = {
	width: {
		xs: 150,
		md: 200,
	},
};

export const AUTOCOMPLETE_TYPE_STYLE = {
	width: {
		xs: 150,
		md: 200,
	},
};

export const AUTOCOMPLETE_MOVIE_STYLE = {
	width: {
		xs: 150,
		md: 200,
	},
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

export const TITLE_STYLES = {
	fontSize: '1.6rem',
	mb: (theme) => theme.spacing(2.5),
	textAlign: 'center',
	fontWeight: '500',
};

export const DIVIDER_STYLES = {
	mb: 3,
};
