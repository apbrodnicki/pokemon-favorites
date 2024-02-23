import { Box, LinearProgress, Paper, Popover, Typography } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import { CustomTooltip } from 'components/custom/CustomTooltip';
import { typeColors } from 'data';
import type { Ability, Type, Types } from 'models/models';
import React, { useState } from 'react';
import { capitalizeFirstLetter, formatAbilityName, getProgressColor } from './helper';

export const getDataGridColumns = (abilitiesWithDescriptions: Ability[], types: Type[]): GridColDef[] => {
	return [
		{
			field: 'name',
			headerName: 'Name',
			type: 'string',
			width: 200,
			headerAlign: 'center',
			headerClassName: 'header',
			align: 'center',
			renderCell: (param) => <Typography>{param.value}</Typography>,
		},
		{
			field: 'sprite',
			headerName: 'Sprite',
			type: 'string',
			width: 200,
			headerAlign: 'center',
			headerClassName: 'header',
			align: 'center',
			renderCell: (param) => <img src={param.value} alt='sprite' />
		},
		{
			field: 'types',
			headerName: 'Types',
			type: 'array',
			width: 200,
			headerAlign: 'center',
			headerClassName: 'header',
			align: 'center',
			renderCell: (param) => {
				const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
				const open = Boolean(anchorEl);

				const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>): void => {
					setAnchorEl(event.currentTarget);
				};

				const handlePopoverClose = (): void => {
					setAnchorEl(null);
				};

				if (param.value.length > 1) {
					return param.value.map((type: keyof Types, index: number) => {
						console.log('here', param);
						console.log('2', types);
						let title = '';
						for (const item of types) {
							if (item.name === type) {
								title = item.doubleDamageFrom.join(',');
							}
						}
						console.log({ title });
						return (
							<>
								<Popover
									sx={{
										pointerEvents: 'none',
									}}
									open={open}
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'center',
									}}
									transformOrigin={{
										vertical: 'bottom',
										horizontal: 'center',
									}}
									onClose={handlePopoverClose}
								>
									<Paper elevation={5} sx={{ height: '200px', width: '200px', p: 3 }}>
											HELLO
									</Paper>
								</Popover>
								<Box
									sx={{
										width: '40%',
										backgroundColor: typeColors[type],
									}}
									onMouseEnter={handlePopoverOpen}
									onMouseLeave={handlePopoverClose}
									key={index}
								>
									<Typography my={1} align='center'>{capitalizeFirstLetter(type)}</Typography>
								</Box>
							</>
						);
					});
				} else {
					const type = param.value[0] as keyof Types;
					return (
						<>
							<Popover
								sx={{
									pointerEvents: 'none',
								}}
								open={open}
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'center',
								}}
								transformOrigin={{
									vertical: 'bottom',
									horizontal: 'center',
								}}
								onClose={handlePopoverClose}
							>
								<Paper elevation={5} sx={{ height: '200px', width: '200px', p: 3 }}>
											HELLO ONE TYPE
								</Paper>
							</Popover>
							<Box
								sx={{
									width: '40%',
									backgroundColor: typeColors[type],
								}}
								onMouseEnter={handlePopoverOpen}
								onMouseLeave={handlePopoverClose}
							>
								<Typography my={1} align='center'>{capitalizeFirstLetter(type)}</Typography>
							</Box>
						</>
					);
				}
			}
		},
		{
			field: 'abilities',
			headerName: 'Abilities',
			type: 'array',
			width: 200,
			headerAlign: 'center',
			headerClassName: 'header',
			align: 'center',
			renderCell: (param) =>
				<Box>
					{param.value.map((ability: string, index: number) => {
						const title = abilitiesWithDescriptions.find(currentAbility => Object.keys(currentAbility).includes(ability));

						return (
							<CustomTooltip
								title={(title != null) ? title[ability] : ''}
								key={index}
							>
								<Typography my={1} align='center'>{formatAbilityName(ability)}</Typography>
							</CustomTooltip>
						);
					})}
				</Box>
		},
		{
			field: 'hp',
			headerName: 'HP',
			type: 'number',
			width: 164,
			headerAlign: 'center',
			headerClassName: 'header',
			align: 'center',
			renderCell: (param) =>
				<Box width='100%'>
					<Typography my={1} textAlign='center'>{param.value}</Typography>
					<LinearProgress
						variant='determinate'
						value={param.value / 255 * 100}
						sx={{
							height: 30,
							'& .MuiLinearProgress-bar1Determinate': {
								backgroundColor: getProgressColor(param.value / 255 * 100)
							}
						}}
					/>
				</Box>
		},
		{
			field: 'attack',
			headerName: 'Attack',
			type: 'number',
			width: 164,
			headerAlign: 'center',
			headerClassName: 'header',
			align: 'center',
			renderCell: (param) =>
				<Box width='100%'>
					<Typography my={1} textAlign='center'>{param.value}</Typography>
					<LinearProgress
						variant='determinate'
						value={param.value / 255 * 100}
						sx={{
							height: 30,
							'& .MuiLinearProgress-bar1Determinate': {
								backgroundColor: getProgressColor(param.value / 255 * 100)
							}
						}}
					/>
				</Box>
		},
		{
			field: 'defense',
			headerName: 'Defense',
			type: 'number',
			width: 164,
			headerAlign: 'center',
			headerClassName: 'header',
			align: 'center',
			renderCell: (param) =>
				<Box width='100%'>
					<Typography my={1} textAlign='center'>{param.value}</Typography>
					<LinearProgress
						variant='determinate'
						value={param.value / 255 * 100}
						sx={{
							height: 30,
							'& .MuiLinearProgress-bar1Determinate': {
								backgroundColor: getProgressColor(param.value / 255 * 100)
							}
						}}
					/>
				</Box>
		},
		{
			field: 'specialAttack',
			headerName: 'Special Attack',
			type: 'number',
			width: 164,
			headerAlign: 'center',
			headerClassName: 'header',
			align: 'center',
			renderCell: (param) =>
				<Box width='100%'>
					<Typography my={1} textAlign='center'>{param.value}</Typography>
					<LinearProgress
						variant='determinate'
						value={param.value / 255 * 100}
						sx={{
							height: 30,
							'& .MuiLinearProgress-bar1Determinate': {
								backgroundColor: getProgressColor(param.value / 255 * 100)
							}
						}}
					/>
				</Box>
		},
		{
			field: 'specialDefense',
			headerName: 'Special Defense',
			type: 'number',
			width: 164,
			headerAlign: 'center',
			headerClassName: 'header',
			align: 'center',
			renderCell: (param) =>
				<Box width='100%'>
					<Typography my={1} textAlign='center'>{param.value}</Typography>
					<LinearProgress
						variant='determinate'
						value={param.value / 255 * 100}
						sx={{
							height: 30,
							'& .MuiLinearProgress-bar1Determinate': {
								backgroundColor: getProgressColor(param.value / 255 * 100)
							}
						}}
					/>
				</Box>
		},
		{
			field: 'speed',
			headerName: 'Speed',
			type: 'number',
			width: 164,
			headerAlign: 'center',
			headerClassName: 'header',
			align: 'center',
			renderCell: (param) =>
				<Box width='100%'>
					<Typography my={1} textAlign='center'>{param.value}</Typography>
					<LinearProgress
						variant='determinate'
						value={param.value / 255 * 100}
						sx={{
							height: 30,
							'& .MuiLinearProgress-bar1Determinate': {
								backgroundColor: getProgressColor(param.value / 255 * 100)
							}
						}}
					/>
				</Box>
		},
	];
};
