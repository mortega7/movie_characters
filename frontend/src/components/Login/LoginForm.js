import { Form, useActionData, useNavigation } from 'react-router-dom';
import {
	Box,
	Button,
	Container,
	Paper,
	Stack,
	TextField,
	Typography,
} from '@mui/material';

import {
	CONTAINER_STYLES,
	CONTENT_STYLES,
	ERROR_STYLE,
	FORM_STACK_STYLES,
	FORM_TITLE_STYLES,
	PAPER_STYLES,
	STACK_STYLES,
} from './LoginForm.styles';

function LoginForm() {
	const data = useActionData();
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';

	return (
		<Box sx={CONTENT_STYLES}>
			<Container sx={CONTAINER_STYLES}>
				<Stack sx={STACK_STYLES}>
					<Box>
						<Paper elevation={4} sx={PAPER_STYLES}>
							<Typography sx={FORM_TITLE_STYLES}>Login</Typography>
							<Form method="post">
								{data && data.error && (
									<Typography sx={ERROR_STYLE}>{data.error}</Typography>
								)}
								<Stack sx={FORM_STACK_STYLES}>
									<TextField
										fullWidth
										label="Email"
										variant="outlined"
										type="email"
										name="email"
										required
									/>
									<TextField
										fullWidth
										label="Password"
										variant="outlined"
										type="password"
										name="password"
										required
									/>
									<Button
										type="submit"
										variant="contained"
										color="primary"
										size="large"
										disabled={isSubmitting}
									>
										{isSubmitting ? 'Submitting...' : 'Login'}
									</Button>
								</Stack>
							</Form>
						</Paper>
					</Box>
				</Stack>
			</Container>
		</Box>
	);
}

export default LoginForm;
