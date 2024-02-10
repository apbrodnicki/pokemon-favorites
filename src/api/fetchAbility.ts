export const fetchAbility = async (name: string): Promise<any> => {
	const response = await fetch('https://pokeapi.co/api/v2/ability/' + name);
	return response.json();
};
