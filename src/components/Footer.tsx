import { Paper, Box, Typography, Link as MuiLink, Tooltip, Zoom } from '@mui/material';
import { useFetchSprite } from 'api/useFetchSprite';
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';

export const Footer = () => {
	return (
		<Paper elevation={3} sx={{ m: 2, p: 4, backgroundColor: '#7A9E9f' }}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Tooltip title='Rampardos' TransitionComponent={Zoom} placement='top' leaveDelay={100} arrow>
					<Box
						component='img'
						src={useFetchSprite('rampardos')}
						alt='rampardos'
						mx={2}
					/>
				</Tooltip>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Box mx={2}>
						<Typography variant='subtitle2'>
							Created by Alex Brodnicki
						</Typography>
						<Typography variant="subtitle2">
							Data provided by PokéAPI
						</Typography>
					</Box>
					<MuiLink href='https://github.com/apbrodnicki' target='_blank'>
						<GitHubIcon fontSize='large' />
					</MuiLink>
				</Box>
				<Tooltip title='Omastar' TransitionComponent={Zoom} placement='top' leaveDelay={100} arrow>
					<Box
						component='img'
						src={useFetchSprite('omastar')}
						alt='omastar'
						mx={2}
					/>
				</Tooltip>
			</Box>
		</Paper >
	);
};
