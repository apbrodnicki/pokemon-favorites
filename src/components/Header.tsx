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
				<Link to="/" style={{ textDecoration: 'none' }}>
					<Typography
						variant="h1"
						color='black'
						align="center"
						sx={{
							'&:hover': {
								textShadow: '5px 5px 10px #B8D8D8',
								transition: '.3s',
							},
						}}
					>
						Pokémon Favorites
					</Typography>
				</Link>
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
