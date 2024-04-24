import { Grid } from '@mui/material';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { CONTENT_STYLES, GRID_STYLES } from './Layout.styles';

function Layout({ centerItems, children }) {
	return (
		<Grid container sx={GRID_STYLES}>
			<Grid item>
				<Header />
			</Grid>
			<Grid
				item
				container
				sx={{ ...CONTENT_STYLES, alignItems: centerItems ? 'center' : 'start' }}
			>
				{children}
			</Grid>
			<Grid item>
				<Footer />
			</Grid>
		</Grid>
	);
}

export default Layout;
