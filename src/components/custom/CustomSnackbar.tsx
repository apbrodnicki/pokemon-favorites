import { Alert, Snackbar } from '@mui/material';
import React from 'react';

export interface CustomSnackbarProps {
	snackbarOpen: boolean,
	setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>,
	severity: 'success' | 'info' | 'warning' | 'error',
	message: string,
}

export const CustomSnackbar = (
	{ snackbarOpen, setSnackbarOpen, severity, message }: CustomSnackbarProps
): React.JSX.Element => {
	return (
		<Snackbar
			open={snackbarOpen}
			autoHideDuration={5000}
			onClose={() => { setSnackbarOpen(false); }}
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
		>
			<Alert
				severity={severity}
				variant='filled'
				sx={{ width: '100%' }}
			>
				{message}
			</Alert>
		</Snackbar>
	);
};
