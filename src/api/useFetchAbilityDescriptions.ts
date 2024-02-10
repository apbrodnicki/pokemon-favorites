import { useEffect, useState } from 'react';
import { fetchAbility } from './fetchAbility';
import { getAbilityDescription } from 'helper';

export const useFetchAbilityDescriptions = (abilities: string[]) => {
	const [descriptions, setDescriptions] = useState<any>();

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
