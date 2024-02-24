import { Box, Paper, Popover, Typography } from '@mui/material';
import { typeColors } from 'data';
import { capitalizeFirstLetter } from 'helper/helper';
import type { DamageRelation, Type, Types } from 'models/models';
import React, { useState } from 'react';

interface TypesCellProps {
	typeStrings: Array<keyof Types>,
	types: Type[]
}

export const TypesCell = (props: TypesCellProps): React.JSX.Element => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const open = Boolean(anchorEl);

	const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>): void => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = (): void => {
		setAnchorEl(null);
	};

	if (props.typeStrings.length > 1) {
		const typeBoxes = props.typeStrings.map((typeName: keyof Types, index: number) => (
			<Box
				sx={{
					width: '40%',
					backgroundColor: typeColors[typeName],
				}}
				key={index}
			>
				<Typography my={1} align='center'>{capitalizeFirstLetter(typeName)}</Typography>
			</Box>
		));

		const type: DamageRelation = {
			quadrupleDamageFrom: [],
			doubleDamageFrom: [],
			halfDamageFrom: [],
			quarterDamageFrom: [],
			noDamageFrom: [],
		};

		for (const typeName of props.typeStrings) {
			for (const item of props.types) {
				if (item.name === typeName) {
					for (const currentType of item.doubleDamageFrom) {
						if (!type.doubleDamageFrom.includes(currentType)) {
							type.doubleDamageFrom.push(currentType);
						} else {
							type.doubleDamageFrom = type.doubleDamageFrom.filter((type) => type !== currentType);
							type.quadrupleDamageFrom !== undefined ? type.quadrupleDamageFrom.push(currentType) : type.quadrupleDamageFrom = [];
						}
					}

					for (const currentType of item.halfDamageFrom) {
						if (!type.halfDamageFrom.includes(currentType)) {
							type.halfDamageFrom.push(currentType);
						} else {
							type.halfDamageFrom = type.halfDamageFrom.filter((type) => type !== currentType);
							type.quarterDamageFrom !== undefined ? type.quarterDamageFrom.push(currentType) : type.quarterDamageFrom = [];
						}
					}

					type.noDamageFrom = item.noDamageFrom;
				}
			}
		}
		console.log({ type });
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
						<Box>
							Very weak to:
						</Box>
						<Box>
							Weak to:
						</Box>
						<Box>
							Resists:
						</Box>
						<Box>
							Strongly resists:
						</Box>
						<Box>
							Immune:
						</Box>
					</Paper>
				</Popover>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%',
					}}
					onMouseEnter={handlePopoverOpen}
					onMouseLeave={handlePopoverClose}
				>
					{typeBoxes}
				</Box>
			</>
		);
	} else {
		const typeName = props.typeStrings[0] as keyof Types;
		let type: DamageRelation = {
			doubleDamageFrom: [],
			halfDamageFrom: [],
			noDamageFrom: [],
		};

		for (const item of props.types) {
			if (item.name === typeName) {
				type = item;
			}
		}

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
					<Paper elevation={5} sx={{ height: '200px', width: '250px', p: 3 }}>
						<Box>
							Weak to: {type.doubleDamageFrom}
						</Box>
						<Box>
							Resists: {type.halfDamageFrom}
						</Box>
						<Box>
							Immune: {type.noDamageFrom}
						</Box>
					</Paper>
				</Popover>
				<Box
					sx={{
						width: '40%',
						backgroundColor: typeColors[typeName],
					}}
					onMouseEnter={handlePopoverOpen}
					onMouseLeave={handlePopoverClose}
				>
					<Typography my={1} align='center'>{capitalizeFirstLetter(typeName)}</Typography>
				</Box>
			</>
		);
	}
};
