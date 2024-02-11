import { getSprite } from 'helper';
import { useEffect, useState } from 'react';
import { fetchPokemon } from 'api/fetchPokemon';
import { type GenericPokemon } from 'models/genericModels';

export const useFetchSprite = (name: string): string => {
	const [sprite, setSprite] = useState<string>('');

	useEffect(() => {
		void fetchPokemon(name)
			.then((response: GenericPokemon) => response)
			.then((result: GenericPokemon) => { setSprite(getSprite(result)); });
	}, [name]);

	return sprite;
};
