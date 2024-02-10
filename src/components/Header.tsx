import React from "react";
import { Box, Paper, Tooltip, Typography, Zoom } from "@mui/material";
import { Link } from 'react-router-dom';
import { useFetchSprite } from "api/useFetchSprite";

export const Header = () => {
	return (
		<Paper elevation={3} sx={{ m: 2, p: 4, backgroundColor: '#7A9E9f' }}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Tooltip title='Aurorus' TransitionComponent={Zoom} placement='top' leaveDelay={100} arrow>
					<Box
						component='img'
						src={useFetchSprite('aurorus')}
						alt='aurorus'
						mx={2}
					/>
				</Tooltip>
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
						Pokemon Favorites
					</Typography>
				</Link>
				<Tooltip title='Cradily' TransitionComponent={Zoom} placement='top' leaveDelay={100} arrow>
					<Box
						component='img'
						src={useFetchSprite('cradily')}
						alt='cradily'
						mx={2}
					/>
				</Tooltip>
			</Box>
		</Paper >
	);
};
