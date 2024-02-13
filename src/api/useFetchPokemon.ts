import { fetchPokemon } from 'api/fetchPokemon';
import { filterPokemonData } from 'helper';
import { type Pokemon } from 'models/models';
import type React from 'react';
import { useEffect, useState } from 'react';

interface useFetchPokemonProps {
	pokemonList: string[],
	setIsLoadingPokemon: React.Dispatch<React.SetStateAction<boolean>>
}

export const useFetchPokemon = (props: useFetchPokemonProps): Pokemon[] => {
	const [pokemon, setPokemon] = useState<Pokemon[]>([]);

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			try {
				const promises = props.pokemonList.map(async (mon: string) => await fetchPokemon(mon));
				const pokemonData = await Promise.all(promises);
				const filteredPokemon = pokemonData.map(filterPokemonData);
				setPokemon(filteredPokemon);
			} catch (error) {
				console.log('Error fetching Pokémon ->', error);
			} finally {
				props.setIsLoadingPokemon(false);
			}
		};

		void fetchData();
	}, [props.pokemonList]);

	return pokemon;
};
