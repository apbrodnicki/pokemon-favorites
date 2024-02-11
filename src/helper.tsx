import { Typography, Box, LinearProgress } from '@mui/material';
import { type GridColDef } from '@mui/x-data-grid';
import { CustomTooltip } from 'components/custom/CustomTooltip';
import { typeColors } from 'data';
import { type GenericPokemon, type Pokemon, type Stats } from 'models';
import React from 'react';

export const getSprite = (pokemon: GenericPokemon): string => {
	return pokemon.sprites.versions['generation-v']['black-white'].animated.front_default ?? pokemon.sprites.front_default; // choose gif over png
};

export const getAbilityDescription = (ability) => {
	let description: string = '';
	let updatedAbility = {};
	for (const entry of ability.effect_entries) {
		if (entry.language.name === 'en') {
			description = entry.short_effect;
			updatedAbility = { [ability.name]: description };
		}
	}

	return updatedAbility;
};

export const getColumns = (descriptions): GridColDef[] => {
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
			renderCell: (param) => <img src={param.value} alt='' />
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
				param.value.map((type: string, index: number) => (
					<Box
						key={index}
						sx={{
							width: '40%',
							backgroundColor: typeColors[type],
						}}
					>
						<Typography my={1} align='center'>{type}</Typography>
					</Box>
				))
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
					{param.value.map((ability: string, index: number) => (
						<CustomTooltip
							key={index}
							title={descriptions.map(description => description[ability])}
						>
							<Typography my={1} align='center'>{formatAbilityName(ability)}</Typography>
						</CustomTooltip>
					))}
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
					<LinearProgress variant='determinate' value={param.value / 255 * 100} color='primary' sx={{ height: 30 }} />
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
					<LinearProgress variant='determinate' value={param.value / 255 * 100} color='primary' sx={{ height: 30 }} />
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
					<LinearProgress variant='determinate' value={param.value / 255 * 100} color='primary' sx={{ height: 30 }} />
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
					<LinearProgress variant='determinate' value={param.value / 255 * 100} color='primary' sx={{ height: 30 }} />
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
					<LinearProgress variant='determinate' value={param.value / 255 * 100} color='primary' sx={{ height: 30 }} />
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
					<LinearProgress variant='determinate' value={param.value / 255 * 100} color='primary' sx={{ height: 30 }} />
				</Box>
		},
	];
};

export const filterPokemonData = (pokemon: GenericPokemon): Pokemon => {
	let name: string;
	const types: string[] = [];
	const abilities: string[] = [];
	const stats: Stats = {
		hp: 0,
		attack: 0,
		defense: 0,
		'special-attack': 0,
		'special-defense': 0,
		speed: 0,
	};

	if (pokemon.name.includes('-mega')) {
		const split = pokemon.name.split('-');
		const capitalizedName = capitalizeFirstLetter(split[0]);
		name = split.length === 2 ? 'Mega ' + capitalizedName : 'Mega ' + capitalizedName + ' ' + split[2].toUpperCase();
	} else {
		name = capitalizeFirstLetter(pokemon.name);
	}

	for (const type of pokemon.types) {
		types.push(capitalizeFirstLetter(type.type.name));
	}

	for (const ability of pokemon.abilities) {
		abilities.push(ability.ability.name);
	}

	for (const stat of pokemon.stats) {
		stats[stat.stat.name] = stat.base_stat;
	}

	return {
		name,
		sprite: pokemon.sprites.versions['generation-v']['black-white'].animated.front_default ?? pokemon.sprites.front_default, // choose gif over png
		types,
		abilities,
		...stats,
	};
};

export const filterPokemonAbilities = (abilities) => {
	const abilityArray: string[] = [];

	for (const ability of abilities) {
		abilityArray.push(ability.name);
	}

	return abilityArray;
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
