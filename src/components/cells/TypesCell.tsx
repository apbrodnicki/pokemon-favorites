import { Box, Grid, Paper, Typography } from '@mui/material';
import { typeColors } from 'data';
import { capitalizeFirstLetter } from 'helper/helper';
import PopupState, { bindHover, bindPopover } from 'material-ui-popup-state';
import HoverPopover from 'material-ui-popup-state/HoverPopover';
import type { DamageRelation, Type, Types } from 'models/models';
import React from 'react';

interface TypesCellProps {
	typeStrings: Array<keyof Types>,
	types: Type[]
}

export const TypesCell = (props: TypesCellProps): React.JSX.Element => {
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
			<PopupState variant="popover" popupId="doubleTypesPopup">
				{(popupState) => (
					<>
						<HoverPopover
							{...bindPopover(popupState)}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'center',
							}}
							transformOrigin={{
								vertical: 'bottom',
								horizontal: 'center',
							}}
						>
							<Paper
								elevation={5}
								sx={{
									backgroundColor: '#B8D8D8',
									height: '375px',
									width: '350px',
									p: 3
								}}
							>
								{damageRelation.quadrupleDamageFrom !== undefined && damageRelation.quadrupleDamageFrom.length > 0 && (
									<>
										<Typography>
											Very weak to (4x):
										</Typography>
										<Grid container>
											{damageRelation.quadrupleDamageFrom?.map((type: string, index: number) => (
												<Grid item xs={3} key={index}>
													<Typography align='center' m={.5} p={.5} sx={{ backgroundColor: typeColors[type as keyof Types] }}>
														{capitalizeFirstLetter(type)}
													</Typography>
												</Grid>
											))}
										</Grid>
									</>
								)}
								{damageRelation.doubleDamageFrom.length > 0 && (
									<>
										<Typography>
											Weak to (2x):
										</Typography>
										<Grid container>
											{damageRelation.doubleDamageFrom.map((type: string, index: number) => (
												<Grid item xs={3} key={index}>
													<Typography align='center' m={.5} p={.5} sx={{ backgroundColor: typeColors[type as keyof Types] }}>
														{capitalizeFirstLetter(type)}
													</Typography>
												</Grid>
											))}
										</Grid>
									</>
								)}
								{damageRelation.halfDamageFrom.length > 0 && (
									<>
										<Typography>
											Resists (.5x):
										</Typography>
										<Grid container>
											{damageRelation.halfDamageFrom.map((type: string, index: number) => (
												<Grid item xs={3} key={index}>
													<Typography align='center' m={.5} p={.5} sx={{ backgroundColor: typeColors[type as keyof Types] }}>
														{capitalizeFirstLetter(type)}
													</Typography>
												</Grid>
											))}
										</Grid>
									</>
								)}
								{damageRelation.quarterDamageFrom !== undefined && damageRelation.quarterDamageFrom.length > 0 && (
									<>
										<Typography>
											Strongly resists (.25x):
										</Typography>
										<Grid container>
											{damageRelation.quarterDamageFrom?.map((type: string, index: number) => (
												<Grid item xs={3} key={index}>
													<Typography align='center' m={.5} p={.5} sx={{ backgroundColor: typeColors[type as keyof Types] }}>
														{capitalizeFirstLetter(type)}
													</Typography>
												</Grid>
											))}
										</Grid>
									</>
								)}
								{damageRelation.noDamageFrom.length > 0 && (
									<>
										<Typography>
											Immune to (0x):
										</Typography>
										<Grid container>
											{damageRelation.noDamageFrom.map((type: string, index: number) => (
												<Grid item xs={3} key={index}>
													<Typography align='center' m={.5} p={.5} sx={{ backgroundColor: typeColors[type as keyof Types] }}>
														{capitalizeFirstLetter(type)}
													</Typography>
												</Grid>
											))}
										</Grid>
									</>
								)}
							</Paper>
						</HoverPopover>
						<Box
							{...bindHover(popupState)}
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								width: '100%',
							}}
						>
							{typeBoxes}
						</Box>
					</>
				)}
			</PopupState>
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
			<PopupState variant="popover" popupId="singleTypePopup">
				{(popupState) => (
					<>
						<HoverPopover
							{...bindPopover(popupState)}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'center',
							}}
							transformOrigin={{
								vertical: 'bottom',
								horizontal: 'center',
							}}
						>
							<Paper
								elevation={5}
								sx={{
									backgroundColor: '#B8D8D8',
									height: '300px',
									width: '300px',
									p: 3
								}}
							>
								{damageRelation.doubleDamageFrom.length > 0 && (
									<>
										<Typography>
											Weak to (2x):
										</Typography>
										<Grid container>
											{damageRelation.doubleDamageFrom.map((type: string, index: number) => (
												<Grid item xs={3} key={index}>
													<Typography align='center' m={.5} p={.5} sx={{ backgroundColor: typeColors[type as keyof Types] }}>
														{capitalizeFirstLetter(type)}
													</Typography>
												</Grid>
											))}
										</Grid>
									</>
								)}
								{damageRelation.halfDamageFrom.length > 0 && (
									<>
										<Typography>
											Resists (.5x):
										</Typography>
										<Grid container>
											{damageRelation.halfDamageFrom.map((type: string, index: number) => (
												<Grid item xs={3} key={index}>
													<Typography align='center' m={.5} p={.5} sx={{ backgroundColor: typeColors[type as keyof Types] }}>
														{capitalizeFirstLetter(type)}
													</Typography>
												</Grid>
											))}
										</Grid>
									</>
								)}
								{damageRelation.noDamageFrom.length > 0 && (
									<>
										<Typography>
											Immune to (0x):
										</Typography>
										<Grid container>
											{damageRelation.noDamageFrom.map((type: string, index: number) => (
												<Grid item xs={3} key={index}>
													<Typography align='center' m={.5} p={.5} sx={{ backgroundColor: typeColors[type as keyof Types] }}>
														{capitalizeFirstLetter(type)}
													</Typography>
												</Grid>
											))}
										</Grid>
									</>
								)}
							</Paper>
						</HoverPopover>
						<Box
							{...bindHover(popupState)}
							sx={{
								width: '40%',
								backgroundColor: typeColors[typeName],
							}}
						>
							<Typography my={1} align='center'>{capitalizeFirstLetter(typeName)}</Typography>
						</Box>
					</>
				)}
			</PopupState>
		);
	}
};
