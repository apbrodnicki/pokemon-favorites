import { Pokemon } from "models";
import { useEffect, useState } from "react"
import { fetchPokemon } from "api/fetchPokemon";
import { filterPokemonData } from "helper";

export const useFetchPokemon = (pokemonList: string[]) => {
	const [pokemon, setPokemon] = useState<Pokemon[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const promises = pokemonList.map((mon: string) => fetchPokemon(mon));
				const pokemonData = await Promise.all(promises);
				const filteredPokemon = pokemonData.map(filterPokemonData);
				setPokemon(filteredPokemon);
			} catch (error) {
				console.log("Error fetching Pokémon ->", error);
			}
		};

		fetchData();
	}, [pokemonList]);

	return pokemon;
};
