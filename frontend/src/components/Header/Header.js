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
	LIST_ITEM_CENTER,
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
						<Typography>
							<Link href="/" sx={LINK_HOME_STYLE}>
								Movies Universe
							</Link>
						</Typography>
						<List sx={LIST_STYLES}>
							{!validToken && (
								<ListItem disablePadding>
									<ListItemButton
										sx={LIST_ITEM_CENTER}
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
										sx={LIST_ITEM_CENTER}
										component={Link}
										href="/characters"
									>
										<ListItemText primary="Characters" />
									</ListItemButton>
								</ListItem>
							)}
							{validToken && (
								<ListItem disablePadding>
									<ListItemButton
										sx={LIST_ITEM_CENTER}
										component={Link}
										href="/movies"
									>
										<ListItemText primary="Movies" />
									</ListItemButton>
								</ListItem>
							)}
							{validToken && (
								<ListItem disablePadding>
									<ListItemButton
										sx={LIST_ITEM_CENTER}
										component={Link}
										href="/genres"
									>
										<ListItemText primary="Genres" />
									</ListItemButton>
								</ListItem>
							)}
							{validToken && (
								<ListItem disablePadding>
									<ListItemButton
										sx={LIST_ITEM_CENTER}
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
