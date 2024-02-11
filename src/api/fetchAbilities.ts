import { type GenericAbilities } from 'models/genericModels';

export const fetchAbilities = async (): Promise<GenericAbilities> => {
	const response = await fetch('https://pokeapi.co/api/v2/ability?limit=999');
	return await response.json();
};
