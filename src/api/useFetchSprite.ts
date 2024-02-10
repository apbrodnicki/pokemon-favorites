import { getSprite } from 'helper';
import { useEffect, useState } from 'react';
import { fetchPokemon } from 'api/fetchPokemon';

export const useFetchSprite = (name: string): string => {
	const [sprite, setSprite] = useState<string>('');

	useEffect(() => {
		void fetchPokemon(name)
			.then((response: Response) => response)
			.then((result: Response) => { setSprite(getSprite(result)); });
	}, [name]);

	return sprite;
};
