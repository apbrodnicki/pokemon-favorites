import { Autocomplete, Button, Grid, ListItem, Paper, TextField } from '@mui/material';
import { useFetchAllPokemon } from 'api/useFetchAllPokemon';
import { PokemonListContext } from 'contexts/PokemonListContext';
import { SnackbarContext } from 'contexts/SnackbarContext';
import React, { useContext, useEffect, useState } from 'react';
// TODO: Fix input not clearing after submit.
export const UpdatePokemon = (): React.JSX.Element => {
	const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } = useContext(SnackbarContext);
	const { pokemonList, setPokemonList } = useContext(PokemonListContext);

	const [pokemonInput, setPokemonInput] = useState<string[]>([]);

	const allPokemon = useFetchAllPokemon();

	useEffect(() => {
		localStorage.setItem('pokemon-favorites_list', JSON.stringify(pokemonList));
	}, [pokemonList]);

	const onAutocompleteChange = (value: string[]): void => {
		setPokemonInput(value);
	};

	const UpdatePokemon = (action: 'add' | 'remove'): void => {
		if (pokemonInput.length < 1) {
			setSnackbarMessage('Error: Input value is empty.');
			setSnackbarColor('error');
			setSnackbarOpen(true);

			setPokemonInput([]);

			return;
		}

		if (action === 'add') {
			for (const name of pokemonInput) {
				if (pokemonList.includes(name)) {
					setSnackbarMessage(`Error: ${name} has already been added.`);
					setSnackbarColor('error');
					setSnackbarOpen(true);

					return;
				}
			}

			setPokemonList([...pokemonList, ...pokemonInput]);

			setSnackbarMessage('Success: Pokémon added.');
			setSnackbarColor('success');
			setSnackbarOpen(true);
		} else if (action === 'remove') {
			setPokemonList(pokemonList.filter((name) => !pokemonInput.includes(name)));

			setSnackbarMessage('Success: Pokémon removed.');
			setSnackbarColor('success');
			setSnackbarOpen(true);
		}

		setPokemonInput([]);
	};

	return (
		<Paper elevation={3} sx={{ m: 5, backgroundColor: '#B8D8D8' }}>
			<Grid container justifyContent='center'>
				<Grid item xs={5} mx={3}>
					<Autocomplete
						options={allPokemon}
						multiple
						disableCloseOnSelect
						isOptionEqualToValue={(option, value) => option === value}
						onChange={(_, value) => { onAutocompleteChange(value); }}
						renderOption={(props, option, { selected }) => (
							<ListItem {...props}>
								{/* <Checkbox
									icon={<CheckBoxOutlineBlankIcon />}
									checkedIcon={<CheckBoxIcon />}
									style={{ marginRight: 8 }}
									checked={selected}
								/> */}
								{option}
							</ListItem>
						)}
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
						multiple
						disableCloseOnSelect
						isOptionEqualToValue={(option, value) => option === value}
						onChange={(_, value) => { onAutocompleteChange(value); }}
						renderOption={(props, option, { selected }) => (
							<ListItem {...props}>
								{/* <Checkbox
									icon={<CheckBoxOutlineBlankIcon />}
									checkedIcon={<CheckBoxIcon />}
									style={{ marginRight: 8 }}
									checked={selected}
								/> */}
								{option}
							</ListItem>
						)}
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
