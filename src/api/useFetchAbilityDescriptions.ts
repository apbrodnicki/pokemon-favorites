import { useEffect, useState } from "react"
import { fetchAbility } from "./fetchAbility";
import { getAbilityDescription } from "helper";

export const useFetchAbilityDescriptions = (abilities: string[]): any => {
	const [descriptions, setDescriptions] = useState<any>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const promises = abilities?.map((ability: string) => fetchAbility(ability));
				const abilityData = await Promise.all(promises);
				const abilityDescriptions = abilityData.map(getAbilityDescription);
				setDescriptions(abilityDescriptions);
			} catch (error) {
				console.log("Error fetching ability descriptions ->", error);
			}
		};

		fetchData();
	}, [abilities]);

	return descriptions;
};
