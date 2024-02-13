import { getAbilityDescription } from 'helper';
import { type Ability } from 'models/models';
import type React from 'react';
import { useEffect, useState } from 'react';
import { fetchAbility } from './fetchAbility';

interface useFetchAbilityDescriptionsProps {
	abilities: string[],
	setIsLoadingAbilityDescriptions: React.Dispatch<React.SetStateAction<boolean>>
}

export const useFetchAbilityDescriptions = (props: useFetchAbilityDescriptionsProps): Ability[] => {
	const [descriptions, setDescriptions] = useState<Ability[]>([]);

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			try {
				const promises = props.abilities?.map(async (ability: string) => await fetchAbility(ability));
				const abilityData = await Promise.all(promises);
				const abilityDescriptions = abilityData.map(getAbilityDescription);
				setDescriptions(abilityDescriptions);
			} catch (error) {
				console.log('Error fetching ability descriptions ->', error);
			} finally {
				props.setIsLoadingAbilityDescriptions(false);
			}
		};

		void fetchData();
	}, [props.abilities]);

	return descriptions;
};
