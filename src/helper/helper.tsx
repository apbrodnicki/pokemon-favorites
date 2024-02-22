import { Box, LinearProgress, Typography } from '@mui/material';
import { type GridColDef } from '@mui/x-data-grid';
import { CustomTooltip } from 'components/custom/CustomTooltip';
import { pokemonLists, typeColors } from 'data';
import { type Ability, type PokemonListsTemplate, type Type, type Types } from 'models/models';
import React from 'react';

export const getColumns = (abilitiesWithDescriptions: Ability[], types: Type[]): GridColDef[] => {
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
			renderCell: (param) =>
				param.value.map((type: keyof Types, index: number) => {
					let title = '';
					for (const item of types) {
						if (item.name === type) {
							title = item.double_damage_from.join(',');
						}
					}
					console.log(type);
					console.log(types);
					return (
						<CustomTooltip
							title={title}
							key={index}
						>
							<Box
								sx={{
									width: '40%',
									backgroundColor: typeColors[type],
								}}
							>
								<Typography my={1} align='center'>{capitalizeFirstLetter(type)}</Typography>
							</Box>
						</CustomTooltip>
					);
				})
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
								key={index}
								title={(title != null) ? title[ability] : ''}
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
			field: 'special-attack',
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
			field: 'special-defense',
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

export const formatAbilityName = (name: string): string => {
	const updatedNameArray: string[] = [];

	for (const item of name.split('-')) {
		updatedNameArray.push(capitalizeFirstLetter(item));
	}

	return updatedNameArray.join(' ');
};

export const capitalizeFirstLetter = (word: string): string => {
	return word.charAt(0).toUpperCase() + word.slice(1);
};

export const formatPageForRoute = (page: string): string => {
	return page.replace(/\s/g, '').toLowerCase();
};

export const getProgressColor = (progressValue: number): string => {
	const colorRanges = [
		{ max: 10, color: '#B30000' },
		{ max: 20, color: '#B35C00' },
		{ max: 30, color: '#B39900' },
		{ max: 40, color: '#B3B300' },
		{ max: 50, color: '#4CB300' },
		{ max: 60, color: '#1AB300' },
		{ max: 70, color: '#00B32D' },
		{ max: 80, color: '#00B371' },
		{ max: 90, color: '#0077B3' },
		{ max: 100, color: '#3D0077' },
	];

	for (const range of colorRanges) {
		if (progressValue <= range.max) {
			return range.color;
		}
	}

	return 'primary';
};

export const getPokemonList = (list: keyof PokemonListsTemplate): string[] => {
	return pokemonLists[list];
};

export const reduceArray = (abilities: string[][]): string[] => {
	return abilities.reduce(
		(accumulator, currentArray) => {
			for (const currentAbility of currentArray) {
				if (!accumulator.includes(currentAbility)) {
					accumulator.push(currentAbility);
				}
			}

			return accumulator;
		},
		[]
	);
};
