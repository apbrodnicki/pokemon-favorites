export const fetchPokemon = async (name: string): Promise<any> => {
	const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + name);
	return response.json();
};
