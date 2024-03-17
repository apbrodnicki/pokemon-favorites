import { Autocomplete, Button, Grid, Paper, TextField } from '@mui/material';
import { useFetchAllPokemon } from 'api/useFetchAllPokemon';
import { PokemonListContext } from 'contexts/PokemonListContext';
import { SnackbarContext } from 'contexts/SnackbarContext';
import React, { useContext, useEffect, useState } from 'react';
// TODO: Fix input not clearing after submit.
export const UpdatePokemon = (): React.JSX.Element => {
	const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } = useContext(SnackbarContext);
	const { pokemonList, setPokemonList } = useContext(PokemonListContext);

	const [pokemonInput, setPokemonInput] = useState<string>('');

	const allPokemon = useFetchAllPokemon();

	useEffect(() => {
		localStorage.setItem('pokemon-favorites_list', JSON.stringify(pokemonList));
	}, [pokemonList]);

	const onAutocompleteChange = (value: string | null): void => {
		if (value !== null) {
			setPokemonInput(value);
		}
	};

	const UpdatePokemon = (action: 'add' | 'remove'): void => {
		if (pokemonInput === '') {
			setSnackbarMessage('Error: Input value is empty.');
			setSnackbarColor('error');
			setSnackbarOpen(true);
			setPokemonInput('');
			return;
		}

		if (action === 'add') {
			if (!pokemonList.includes(pokemonInput)) {
				setSnackbarMessage('Success: Pokémon added.');
				setSnackbarColor('success');
				setSnackbarOpen(true);
				setPokemonList([...pokemonList, pokemonInput]);
			} else {
				setSnackbarMessage('Error: Pokémon already exists in list.');
				setSnackbarColor('error');
				setSnackbarOpen(true);
			}
		} else if (action === 'remove') {
			setSnackbarMessage('Success: Pokémon removed.');
			setSnackbarColor('success');
			setSnackbarOpen(true);
			setPokemonList(pokemonList.filter((pokemon) => pokemon !== pokemonInput));
		}

		setPokemonInput('');
	};

	return (
		<Paper elevation={3} sx={{ m: 5, backgroundColor: '#B8D8D8' }}>
			<Grid container justifyContent='center'>
				<Grid item xs={5} mx={3}>
					<Autocomplete
						options={allPokemon}
						isOptionEqualToValue={(option, value) => option === value}
						onChange={(_, value) => { onAutocompleteChange(value); }}
						renderInput={(params) => (
							<>
								<TextField
									{...params}
									label='Add Pokémon'
									variant='filled'
								/>
								<Button onClick={() => { UpdatePokemon('add'); }}>
									Submit
								</Button>
							</>
						)}
					/>
				</Grid>
				<Grid item xs={5} mx={3}>
					<Autocomplete
						options={pokemonList}
						isOptionEqualToValue={(option, value) => option === value}
						onChange={(_, value) => { onAutocompleteChange(value); }}
						renderInput={(params) => (
							<>
								<TextField
									{...params}
									label='Remove Pokémon'
									variant='filled'
									value={pokemonInput}
								/>
								<Button onClick={() => { UpdatePokemon('remove'); }}>
									Submit
								</Button>
							</>
						)}
					/>
				</Grid>
			</Grid>
		</Paper>
	);
};
