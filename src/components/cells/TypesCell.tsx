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

		const damageRelation: DamageRelation = {
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
						if (!damageRelation.doubleDamageFrom.includes(currentType)) {
							damageRelation.doubleDamageFrom.push(currentType);
						} else {
							damageRelation.doubleDamageFrom = damageRelation.doubleDamageFrom.filter((type) => type !== currentType);
							damageRelation.quadrupleDamageFrom !== undefined ? damageRelation.quadrupleDamageFrom.push(currentType) : damageRelation.quadrupleDamageFrom = [];
						}
					}

					for (const currentType of item.halfDamageFrom) {
						if (!damageRelation.halfDamageFrom.includes(currentType)) {
							damageRelation.halfDamageFrom.push(currentType);
						} else {
							damageRelation.halfDamageFrom = damageRelation.halfDamageFrom.filter((type) => type !== currentType);
							damageRelation.quarterDamageFrom !== undefined ? damageRelation.quarterDamageFrom.push(currentType) : damageRelation.quarterDamageFrom = [];
						}
					}

					damageRelation.noDamageFrom = item.noDamageFrom;
				}
			}
		}

		const neutralTypes = damageRelation.doubleDamageFrom.filter((type) => damageRelation.halfDamageFrom.includes(type));
		for (const neutralType of neutralTypes) {
			damageRelation.doubleDamageFrom = damageRelation.doubleDamageFrom.filter((type) => type !== neutralType);
			damageRelation.halfDamageFrom = damageRelation.halfDamageFrom.filter((type) => type !== neutralType);
		}

		for (const immuneType of damageRelation.noDamageFrom) {
			if (damageRelation.quadrupleDamageFrom !== undefined && damageRelation.quadrupleDamageFrom.includes(immuneType)) {
				damageRelation.quadrupleDamageFrom = damageRelation.quadrupleDamageFrom.filter((type) => type !== immuneType);
			}
			if (damageRelation.doubleDamageFrom.includes(immuneType)) {
				damageRelation.doubleDamageFrom = damageRelation.doubleDamageFrom.filter((type) => type !== immuneType);
			}
			if (damageRelation.halfDamageFrom.includes(immuneType)) {
				damageRelation.halfDamageFrom = damageRelation.halfDamageFrom.filter((type) => type !== immuneType);
			}
			if ( damageRelation.quarterDamageFrom !== undefined && damageRelation.quarterDamageFrom.includes(immuneType)) {
				damageRelation.quarterDamageFrom = damageRelation.quarterDamageFrom.filter((type) => type !== immuneType);
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
					<Paper elevation={5} sx={{ height: '200px', width: '200px', p: 3 }}>
						<Box>
							Very weak to: {damageRelation.quadrupleDamageFrom}
						</Box>
						<Box>
							Weak to: {damageRelation.doubleDamageFrom}
						</Box>
						<Box>
							Resists: {damageRelation.halfDamageFrom}
						</Box>
						<Box>
							Strongly resists: {damageRelation.quarterDamageFrom}
						</Box>
						<Box>
							Immune: {damageRelation.noDamageFrom}
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
		let damageRelation: DamageRelation = {
			doubleDamageFrom: [],
			halfDamageFrom: [],
			noDamageFrom: [],
		};

		for (const item of props.types) {
			if (item.name === typeName) {
				damageRelation = item;
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
							Weak to: {damageRelation.doubleDamageFrom}
						</Box>
						<Box>
							Resists: {damageRelation.halfDamageFrom}
						</Box>
						<Box>
							Immune: {damageRelation.noDamageFrom}
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
