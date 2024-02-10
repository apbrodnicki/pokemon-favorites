export const fetchAbilities = async (): Promise<any> => {
	const response = await fetch('https://pokeapi.co/api/v2/ability?limit=999');
	return response.json();
};
