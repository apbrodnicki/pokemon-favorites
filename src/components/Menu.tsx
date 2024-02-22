import { Grid, Paper, Typography, styled } from '@mui/material';
import { pages } from 'data';
import { formatPageForRoute } from 'helper';
import React from 'react';
import { Link } from 'react-router-dom';

export const Menu = (): React.JSX.Element => {
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
	const StyledLink = styled(Link)`
		text-decoration: none;
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		&:active {
			color: rgb(85, 26, 139);
		}
	`;

	return (
		<Grid container spacing={2}>
			{pages.map((page: string, index: number) => (
				<Grid item md={3} xs={6} key={index}>
					<StyledPaper elevation={3} sx={{ m: 5 }}>
						<StyledLink to={formatPageForRoute(page)}>
							<Typography sx={{ typography: { md: 'h6', xs: 'subtitle1' } }} mx={1}>
								{page}
							</Typography>
						</StyledLink>
					</StyledPaper>
				</Grid>
			))}
		</Grid>
	);
};
