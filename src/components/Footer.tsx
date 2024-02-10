import { Paper, Box, Typography, Link as MuiLink } from '@mui/material';
import { useFetchSprite } from 'api/useFetchSprite';
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import { CustomTooltip } from './custom/CustomTooltip';

export const Footer = (): React.JSX.Element => {
	return (
		<Paper elevation={3} sx={{ m: 2, p: 4, backgroundColor: '#7A9E9f' }}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<CustomTooltip title='Rampardos'>
					<Box
						component='img'
						src={useFetchSprite('rampardos')}
						alt='rampardos'
						mx={2}
					/>
				</CustomTooltip>
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
						<CustomTooltip title='The PokéAPI website'>
							<MuiLink href='https://pokeapi.co/' target='_blank' underline='hover' color='black'>
								<Typography variant="subtitle2">
								Data provided by PokéAPI
								</Typography>
							</MuiLink>
						</CustomTooltip>
					</Box>
					<CustomTooltip title='Me!'>
						<MuiLink href='https://github.com/apbrodnicki' target='_blank'>
							<GitHubIcon fontSize='large' />
						</MuiLink>
					</CustomTooltip>
				</Box>
				<CustomTooltip title='Omastar'>
					<Box
						component='img'
						src={useFetchSprite('omastar')}
						alt='omastar'
						mx={2}
					/>
				</CustomTooltip>
			</Box>
		</Paper >
	);
};
