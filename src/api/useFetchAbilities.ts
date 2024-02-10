import { useEffect, useState } from "react"
import { fetchAbilities } from "./fetchAbilities";
import { filterPokemonAbilities } from "helper";

export const useFetchAbilities = (): string[] => {
	const [abilities, setAbilities] = useState<any>();

	useEffect(() => {
		fetchAbilities()
			.then((response: Response) => response)
			.then((result: Response) => setAbilities(filterPokemonAbilities(result['results'])));
	}, []);

	return abilities;
};
