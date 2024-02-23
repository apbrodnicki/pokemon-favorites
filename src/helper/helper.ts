import { pokemonLists } from 'data';
import { type PokemonListsTemplate } from 'models/models';

export const formatAbilityName = (name: string): string => {
	const updatedNameArray: string[] = [];

	for (const item of name.split('-')) {
		updatedNameArray.push(capitalizeFirstLetter(item));
	}

	return updatedNameArray.join(' ');
};

export const capitalizeFirstLetter = (word: string): string => {
	return word.charAt(0).toUpperCase() + word.slice(1);
};

export const formatPageForRoute = (page: string): string => {
	return page.replace(/\s/g, '').toLowerCase();
};

export const getProgressColor = (progressValue: number): string => {
	const colorRanges = [
		{ max: 10, color: '#B30000' },
		{ max: 20, color: '#B35C00' },
		{ max: 30, color: '#B39900' },
		{ max: 40, color: '#B3B300' },
		{ max: 50, color: '#4CB300' },
		{ max: 60, color: '#1AB300' },
		{ max: 70, color: '#00B32D' },
		{ max: 80, color: '#00B371' },
		{ max: 90, color: '#0077B3' },
		{ max: 100, color: '#3D0077' },
	];

	for (const range of colorRanges) {
		if (progressValue <= range.max) {
			return range.color;
		}
	}

	return 'primary';
};

export const getPokemonList = (list: keyof PokemonListsTemplate): string[] => {
	return pokemonLists[list];
};

export const reduceArray = (abilities: string[][]): string[] => {
	return abilities.reduce(
		(accumulator, currentArray) => {
			for (const currentAbility of currentArray) {
				if (!accumulator.includes(currentAbility)) {
					accumulator.push(currentAbility);
				}
			}

			return accumulator;
		},
		[]
	);
};
