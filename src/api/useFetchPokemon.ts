import { type Pokemon } from 'models';
import { useEffect, useState } from 'react';
import { fetchPokemon } from 'api/fetchPokemon';
import { filterPokemonData } from 'helper';

export const useFetchPokemon = (pokemonList: string[]): Pokemon[] => {
	const [pokemon, setPokemon] = useState<Pokemon[]>([]);

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			try {
				const promises = pokemonList.map(async (mon: string) => await fetchPokemon(mon));
				const pokemonData = await Promise.all(promises);
				const filteredPokemon = pokemonData.map(filterPokemonData);
				setPokemon(filteredPokemon);
			} catch (error) {
				console.log('Error fetching Pokémon ->', error);
			}
		};

		void fetchData();
	}, [pokemonList]);

	return pokemon;
};
