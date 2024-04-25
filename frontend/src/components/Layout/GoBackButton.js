import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function GoBackButton({ text, url }) {
	const navigate = useNavigate();

	function handleGoToPage() {
		navigate(url);
	}

	return (
		<Button
			variant="contained"
			startIcon={<ArrowBackIcon />}
			onClick={handleGoToPage}
		>
			{text}
		</Button>
	);
}

export default GoBackButton;
