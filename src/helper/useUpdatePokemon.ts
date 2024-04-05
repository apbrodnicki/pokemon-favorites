import { PokemonListContext } from 'contexts/PokemonListContext';
import { SnackbarContext } from 'contexts/SnackbarContext';
import type React from 'react';
import { useContext } from 'react';

export interface updatePokemonProps {
	action: 'add' | 'remove',
	pokemonInput: string[],
	setPokemonInput: React.Dispatch<React.SetStateAction<string[]>>
}

export const useUpdatePokemon = (): ({ action, pokemonInput, setPokemonInput }: updatePokemonProps) => void => {
	const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } = useContext(SnackbarContext);
	const { pokemonList, setPokemonList } = useContext(PokemonListContext);

	const updatePokemon = (
		{ action, pokemonInput, setPokemonInput }: updatePokemonProps
	): void => {
		if (pokemonInput.length < 1) {
			setSnackbarMessage('Error: Input value is empty.');
			setSnackbarColor('error');
			setSnackbarOpen(true);

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

	return updatePokemon;
};
