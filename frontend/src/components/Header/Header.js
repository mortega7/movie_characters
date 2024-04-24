import {
	AppBar,
	Link,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Stack,
	Toolbar,
	Typography,
} from '@mui/material';

import {
	LIST_STYLES,
	STACK_STYLES,
	TOOLBAR_STYLES,
	LINK_HOME_STYLE,
} from './Header.styles';
import { isValidToken } from '../../util/auth';
import { useSubmit } from 'react-router-dom';

function Header() {
	const validToken = isValidToken();
	const submit = useSubmit();

	const logout = () => {
		submit(null, { action: '/logout', method: 'POST' });
	};

	return (
		<>
			<AppBar>
				<Toolbar variant="regular" sx={TOOLBAR_STYLES}>
					<Stack sx={STACK_STYLES}>
						<Typography variant="h6" sx={{ my: 2 }}>
							<Link href="/" sx={LINK_HOME_STYLE}>
								Movies Universe
							</Link>
						</Typography>
						<List sx={LIST_STYLES}>
							{!validToken && (
								<ListItem disablePadding>
									<ListItemButton
										sx={{ textAlign: 'center' }}
										component={Link}
										href="/login"
									>
										<ListItemText primary="Login" />
									</ListItemButton>
								</ListItem>
							)}
							{validToken && (
								<ListItem disablePadding>
									<ListItemButton
										sx={{ textAlign: 'center' }}
										onClick={() => logout()}
									>
										<ListItemText primary="Logout" />
									</ListItemButton>
								</ListItem>
							)}
						</List>
					</Stack>
				</Toolbar>
			</AppBar>
			<Toolbar />
		</>
	);
}

export default Header;