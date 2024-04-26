import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

function GoToButton({ text, url, type = 'back' }) {
	const navigate = useNavigate();
	const [background, setBackground] = useState('primary.main');
	const [startIcon, setStartIcon] = useState(<ArrowBackIcon />);

	function handleGoToPage() {
		navigate(url);
	}

	useEffect(() => {
		if (type === 'view') {
			setStartIcon(<VisibilityIcon />);
			setBackground('success.main');
		}

		if (type === 'edit') {
			setStartIcon(<EditIcon />);
			setBackground('success.main');
		}
	}, [type]);

	return (
		<Button
			variant="contained"
			startIcon={startIcon}
			onClick={handleGoToPage}
			sx={{
				backgroundColor: background,
				'&:hover': { backgroundColor: background, opacity: 0.8 },
			}}
		>
			{text}
		</Button>
	);
}

export default GoToButton;
