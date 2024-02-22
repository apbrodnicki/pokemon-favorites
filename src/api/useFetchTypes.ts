import { filterTypeData } from 'helper/filterApiData';
import { type Type } from 'models/models';
import type React from 'react';
import { useEffect, useState } from 'react';
import { fetchType } from './fetchType';

interface useFetchTypesProps {
	typesList: string[],
	setIsLoadingTypes: React.Dispatch<React.SetStateAction<boolean>>
}

export const useFetchTypes = (props: useFetchTypesProps): Type[] => {
	const [types, setTypes] = useState<Type[]>([]);

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			try {
				const promises = props.typesList.map(async (type: string) => await fetchType(type));
				const typesData = await Promise.all(promises);
				const filteredTypes = typesData.map(filterTypeData);
				setTypes(filteredTypes);
			} catch (error) {
				console.log('Error fetching types ->', error);
			} finally {
				props.setIsLoadingTypes(false);
			}
		};

		void fetchData();
	}, [props.typesList.join(',')]);

	return types;
};
