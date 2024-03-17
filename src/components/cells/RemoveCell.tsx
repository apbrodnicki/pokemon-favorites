import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import { Box } from '@mui/material';
import { CustomTooltip } from 'components/custom/CustomTooltip';
import React from 'react';

interface RemoveCellProps {
	name: string,
	pokemonList: string[],
	setPokemonList: React.Dispatch<React.SetStateAction<string[]>>,
	setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>,
	setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>,
	setSnackbarColor: React.Dispatch<React.SetStateAction<'success' | 'info' | 'warning' | 'error'>>
}

export const RemoveCell = (
	{
		name,
		pokemonList,
		setPokemonList,
		setSnackbarOpen,
		setSnackbarMessage,
		setSnackbarColor
	}: RemoveCellProps
): React.JSX.Element => {
	const onIconClick = (): void => {
		setSnackbarMessage('Success: Pokémon removed.');
		setSnackbarColor('success');
		setSnackbarOpen(true);
		setPokemonList(pokemonList.filter((pokemon) => pokemon !== name));
	};

	return (
		<>
			<CustomTooltip title='Remove Pokémon from list.'>
				<Box sx={{ cursor: 'pointer' }}>
					<RemoveCircleTwoToneIcon onClick={onIconClick} />
				</Box>
			</CustomTooltip>
		</>
	);
};
