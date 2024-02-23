import { Box, Paper, Typography } from '@mui/material';
import { useFetchSprite } from 'api/useFetchSprite';
import React from 'react';
import { Link } from 'react-router-dom';
import { CustomTooltip } from './custom/CustomTooltip';

export const Header = (): React.JSX.Element => {
	return (
		<Paper elevation={3} sx={{ m: 2, p: 4, backgroundColor: '#7A9E9f' }}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<CustomTooltip title='Aurorus'>
					<Box
						component='img'
						src={useFetchSprite('aurorus')}
						alt='aurorus'
						mx={2}
					/>
				</CustomTooltip>
				<CustomTooltip title='Home Page'>
					<Link to="/" style={{ textDecoration: 'none' }}>
						<Typography
							color='black'
							align="center"
							sx={{
								typography: {
									md: 'h1',
									xs: 'h6'
								}
							}}
						>
						Pokémon Favorites
						</Typography>
					</Link>
				</CustomTooltip>
				<CustomTooltip title='Cradily'>
					<Box
						component='img'
						src={useFetchSprite('cradily')}
						alt='cradily'
						mx={2}
					/>
				</CustomTooltip>
			</Box>
		</Paper >
	);
};
