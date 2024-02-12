import { Grid, Paper, Typography, styled } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export const Menu = (): React.JSX.Element => {
	const pages = ['Gen1', 'Gen2', 'Gen3', 'Gen4', 'Gen5', 'Gen6', 'Gen7', 'Gen8', 'Gen9', 'Megas', 'Fossils', 'Legendaries', 'Regionals'];
	const StyledPaper = styled(Paper)`
		height: 140px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #B8D8D8;

		&:hover {
			background-color: #7A9E9f;
		};
	`;

	return (
		<Grid container spacing={2}>
			{pages.map((page: string, index: number) => (
				<Grid item md={3} xs={6} key={index}>
					<Link to={page.toLowerCase()} style={{ textDecoration: 'none', width: '100%' }}>
						<StyledPaper elevation={3} sx={{ m: 5 }}>
							<Typography sx={{ typography: { md: 'h6', xs: 'subtitle1' } }} mx={1}>
								{page}
							</Typography>
						</StyledPaper>
					</Link>
				</Grid>
			))}
		</Grid>
	);
};
