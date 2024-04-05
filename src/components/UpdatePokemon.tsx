import { Autocomplete, Button, Grid, ListItem, Paper, TextField } from '@mui/material';
import { useFetchAllPokemon } from 'api/useFetchAllPokemon';
import { PokemonListContext } from 'contexts/PokemonListContext';
import { useUpdatePokemon } from 'helper/useUpdatePokemon';
import React, { useContext, useState } from 'react';

export const UpdatePokemon = (): React.JSX.Element => {
	const { pokemonList } = useContext(PokemonListContext);

	const [pokemonInput, setPokemonInput] = useState<string[]>([]);
	const [autocompleteKey, setAutocompleteKey] = useState<string>('');

	const allPokemon = useFetchAllPokemon();
	const updatePokemon = useUpdatePokemon();

	const onAutocompleteChange = (value: string[]): void => {
		setPokemonInput(value);
	};

	const onClick = (action: 'add' | 'remove'): void => {
		updatePokemon({ action, pokemonInput, setPokemonInput });
	};

	const updateAutocompleteKey = (): void => {
		setAutocompleteKey(`key-${Math.random().toString(36).substring(2, 11)}`);
	};

	return (
		<Grid container justifyContent='center'>
			<Grid item xs={12} lg={5} mx={3}>
				<Paper elevation={3} sx={{ m: 5, backgroundColor: '#B8D8D8' }}>
					<Autocomplete
						key={autocompleteKey}
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
								<Button onClick={() => {
									onClick('add');
									updateAutocompleteKey();
								}}>
									Submit
								</Button>
							</>
						)}
					/>
				</Paper>
			</Grid>
			<Grid item xs={12} lg={5} mx={3}>
				<Paper elevation={3} sx={{ m: 5, backgroundColor: '#B8D8D8' }}>
					<Autocomplete
						key={autocompleteKey}
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
								/>
								<Button onClick={() => {
									onClick('remove');
									updateAutocompleteKey();
								}}>
									Submit
								</Button>
							</>
						)}
					/>
				</Paper>
			</Grid>
		</Grid>
	);
};
