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
  gap: {
    xs: 4,
    md: 8,
    lg: 22,
  },
  textAlign: {
    xs: 'center',
    md: 'inherit',
  },
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
  },
  padding: (theme) => theme.spacing(5),
};

export const FORM_TITLE_STYLES = {
  fontSize: '1.6rem',
  mb: (theme) => theme.spacing(2.5),
  textAlign: 'center',
};

export const FORM_STACK_STYLES = {
  gap: 2,
};

export const ERROR_STYLE = {
  color: 'red',
  textAlign: 'center',
  mb: (theme) => theme.spacing(2.5),
  fontSize: '1rem',
  border: '1px solid red',
  padding: (theme) => theme.spacing(1),
}