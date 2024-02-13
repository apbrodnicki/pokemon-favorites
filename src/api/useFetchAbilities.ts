import { filterPokemonAbilities } from 'helper';
import { type GenericAbilities } from 'models/genericModels';
import type React from 'react';
import { useEffect, useState } from 'react';
import { fetchAbilities } from './fetchAbilities';

interface useFetchAbilitiesProps {
	setIsLoadingAbilities: React.Dispatch<React.SetStateAction<boolean>>
}

export const useFetchAbilities = (props: useFetchAbilitiesProps): string[] => {
	const [abilities, setAbilities] = useState<string[]>([]);

	useEffect(() => {
		fetchAbilities()
			.then((response: GenericAbilities) => response)
			.then((result: GenericAbilities) => { setAbilities(filterPokemonAbilities(result)); })
			.catch((error) => { console.log(error); })
			.finally(() => { props.setIsLoadingAbilities(false); });
	}, []);

	return abilities;
};
