import { fetchPokemon } from 'api/fetchPokemon';
import { getSprite } from 'helper';
import { type GenericPokemon } from 'models/genericModels';
import { useEffect, useState } from 'react';

export const useFetchSprite = (name: string): string => {
	const [sprite, setSprite] = useState<string>('');

	useEffect(() => {
		void fetchPokemon(name)
			.then((response: GenericPokemon) => response)
			.then((result: GenericPokemon) => { setSprite(getSprite(result)); });
	}, [name]);

	return sprite;
};
