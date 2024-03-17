import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import { Typography } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import { AbilitiesCell } from 'components/cells/AbilitiesCell';
import { StatCell } from 'components/cells/StatCell';
import { TypesCell } from 'components/cells/TypesCell';
import type { Ability, Type } from 'models/models';
import React from 'react';

export const getDataGridColumns = (abilitiesWithDescriptions: Ability[], types: Type[]): GridColDef[] => {
	return [
		{
			field: 'remove',
			headerName: 'Remove',
			width: 75,
			headerAlign: 'center',
			headerClassName: 'header',
			align: 'center',
			renderCell: () => <RemoveCircleTwoToneIcon />
		},
		{
			field: 'name',
			headerName: 'Name',
			type: 'string',
			width: 250,
			headerAlign: 'center',
			headerClassName: 'header',
			align: 'center',
			renderCell: (param) => <Typography>{param.value}</Typography>
		},
		{
			field: 'sprite',
			headerName: 'Sprite',
			type: 'string',
			width: 125,
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
			renderCell: (param) => <TypesCell typeStrings={param.value} types={types} />
		},
		{
			field: 'abilities',
			headerName: 'Abilities',
			type: 'array',
			width: 150,
			headerAlign: 'center',
			headerClassName: 'header',
			align: 'center',
			renderCell: (param) => <AbilitiesCell abilityStrings={param.value} abilities={abilitiesWithDescriptions} />
		},
		{
			field: 'hp',
			headerName: 'HP',
			type: 'number',
			width: 165,
			headerAlign: 'center',
			headerClassName: 'header',
			align: 'center',
			renderCell: (param) => <StatCell statValue={param.value} />
		},
		{
			field: 'attack',
			headerName: 'Attack',
			type: 'number',
			width: 165,
			headerAlign: 'center',
			headerClassName: 'header',
			align: 'center',
			renderCell: (param) => <StatCell statValue={param.value} />
		},
		{
			field: 'defense',
			headerName: 'Defense',
			type: 'number',
			width: 165,
			headerAlign: 'center',
			headerClassName: 'header',
			align: 'center',
			renderCell: (param) => <StatCell statValue={param.value} />
		},
		{
			field: 'specialAttack',
			headerName: 'Special Attack',
			type: 'number',
			width: 165,
			headerAlign: 'center',
			headerClassName: 'header',
			align: 'center',
			renderCell: (param) => <StatCell statValue={param.value} />
		},
		{
			field: 'specialDefense',
			headerName: 'Special Defense',
			type: 'number',
			width: 165,
			headerAlign: 'center',
			headerClassName: 'header',
			align: 'center',
			renderCell: (param) => <StatCell statValue={param.value} />
		},
		{
			field: 'speed',
			headerName: 'Speed',
			type: 'number',
			width: 165,
			headerAlign: 'center',
			headerClassName: 'header',
			align: 'center',
			renderCell: (param) => <StatCell statValue={param.value} />
		},
	];
};
