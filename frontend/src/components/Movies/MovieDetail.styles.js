export const CONTAINER_STYLES = {
	padding: (theme) => theme.spacing(4, 1),
};

export const CONTENT_STYLES = {
	justifyContent: 'center',
	alignItems: 'center',
	flexGrow: 1,
};

export const STACK_STYLES = {
	alignItems: 'center',
	justifyContent: 'start',
	gap: {
		xs: 2,
		md: 3,
		lg: 4,
	},
	textAlign: {
		xs: 'center',
		md: 'inherit',
	},
};

export const AVATAR_STYLES = {
	width: { xs: 100, md: 150, lg: 200 },
	height: { xs: 100, md: 150, lg: 200 },
	fontSize: '3rem',
	backgroundColor: 'primary.main',
	border: '1px solid white',
	borderColor: 'primary.main',
};

export const TITLE_STYLES = {
	color: 'primary.main',
	fontSize: {
		xs: '1.8rem',
		md: '2.2rem',
	},
	pb: (theme) => theme.spacing(2.5),

	'& .MuiTypography-root': {
		color: 'secondary.main',
		fontSize: '1em',
	},
};

export const DESCRIPTION_STYLES = {
	color: 'secondary.main',
	fontSize: {
		xs: '1.2rem',
		md: '1.4rem',
	},
};

export const PAPER_STYLES = {
	display: 'flex',
	flexDirection: 'column',
	width: {
		xs: 320,
		sm: 400,
		md: 500,
		lg: 700,
	},
	padding: (theme) => theme.spacing(5),
};

export const DETAILS_TITLE_STYLES = {
	fontSize: '1.6rem',
	mb: (theme) => theme.spacing(2.5),
	textAlign: 'center',
};

export const DETAILS_SUBTITLE_STYLES = {
	fontSize: '1rem',
	textAlign: 'center',
};

export const DETAILS_DESCRIPTION_STYLES = {
	fontSize: '1.2rem',
	mb: (theme) => theme.spacing(2.5),
	textAlign: 'center',
	fontWeight: 'bold',
};

export const DETAILS_STACK_STYLES = {
	gap: 2,
};

export const ERROR_STYLE = {
	color: 'red',
	textAlign: 'center',
	mb: (theme) => theme.spacing(2.5),
	fontSize: '1rem',
	border: '1px solid red',
	padding: (theme) => theme.spacing(1),
};

export const CHIP_TEXT = {
	padding: (theme) => theme.spacing(2.5, 2),
	borderRadius: '5rem',
	backgroundColor: 'primary.main',
	color: 'white',
	cursor: 'pointer',
	'&:hover': {
		backgroundColor: 'primary.main',
		opacity: 0.8,
	},
};
