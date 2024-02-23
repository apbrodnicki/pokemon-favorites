import { Grid, MenuItem, Paper, TextField, styled, type SelectChangeEvent } from '@mui/material';
import { pages } from 'data';
import { formatPageForRoute } from 'helper/helper';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface GridTitleCardProps {
	title: string,
	setIsLoadingFunctions: Array<React.Dispatch<React.SetStateAction<boolean>>>,
}

export const GridTitleCard = (props: GridTitleCardProps): React.JSX.Element => {
	const [page, setPage] = useState<string>('');
	const navigate = useNavigate();
	const location = useLocation();

	const onChange = (event: SelectChangeEvent): void => {
		const route = '/' + event.target.value;

		if (location.pathname !== route) {
			for (const setIsLoadingFunction of props.setIsLoadingFunctions) {
				setIsLoadingFunction(true);
			}

			setPage(event.target.value);
			navigate(route);
		}
	};

	const StyledPaper = styled(Paper)`
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #B8D8D8;
		width: 100%;
	`;

	return (
		<Grid container display='flex' justifyContent='center' alignItems='center'>
			<Grid item xs={2}>
				<StyledPaper elevation={3} sx={{ mt: 3, p: 4 }}>
					<TextField
						select
						value={page}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => { onChange(event); }}
						label={props.title}
						fullWidth
					>
						<MenuItem value='' onClick={() => { navigate('/'); }} sx={{ justifyContent: 'center' }}>Home</MenuItem>
						{pages.map((page: string, index: number) => (
							<MenuItem value={formatPageForRoute(page)} key={index} sx={{ justifyContent: 'center' }}>{page}</MenuItem>
						))}
					</TextField>
				</StyledPaper>
			</Grid>
		</Grid>
	);
};
