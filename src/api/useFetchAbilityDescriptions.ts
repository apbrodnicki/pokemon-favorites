import { getAbilityDescription } from 'helper';
import { type Ability } from 'models/models';
import { useEffect, useState } from 'react';
import { fetchAbility } from './fetchAbility';

export const useFetchAbilityDescriptions = (abilities: string[]): Ability[] => {
	const [descriptions, setDescriptions] = useState<Ability[]>([]);

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			try {
				const promises = abilities?.map(async (ability: string) => await fetchAbility(ability));
				const abilityData = await Promise.all(promises);
				const abilityDescriptions = abilityData.map(getAbilityDescription);
				setDescriptions(abilityDescriptions);
			} catch (error) {
				console.log('Error fetching ability descriptions ->', error);
			}
		};

		void fetchData();
	}, [abilities]);

	return descriptions;
};
