import { Box, Paper, Popover, Typography } from '@mui/material';
import { typeColors } from 'data';
import { capitalizeFirstLetter } from 'helper/helper';
import type { Type, Types } from 'models/models';
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
		return (
			<>
				{props.typeStrings.map((typeName: keyof Types, index: number) => (
					<Box
						sx={{
							width: '40%',
							backgroundColor: typeColors[typeName],
						}}
						key={index}
					>
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
							onMouseEnter={handlePopoverOpen}
							onMouseLeave={handlePopoverClose}
						>
							<Typography my={1} align='center'>{capitalizeFirstLetter(typeName)}</Typography>
						</Box>
					</Box>
				))}
			</>
		);
	} else {
		const typeName = props.typeStrings[0] as keyof Types;
		let type: Type = {
			name: '',
			doubleDamageFrom: [],
			doubleDamageTo: [],
			halfDamageFrom: [],
			halfDamageTo: [],
			noDamageFrom: [],
			noDamageTo: [],
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
						Defense
						<Box>
							Immune: {type.noDamageFrom}
						</Box>
						<Box>
							Resist: {type.halfDamageFrom}
						</Box>
						<Box>
							Weak to: {type.doubleDamageFrom}
						</Box>
						Offense (Stab: {type.name})
						<Box>
							Immune: {type.noDamageTo}
						</Box>
						<Box>
							Not very effective: {type.halfDamageTo}
						</Box>
						<Box>
							Super effective: {type.doubleDamageTo}
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
