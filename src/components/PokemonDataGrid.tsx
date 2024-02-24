import { Box, Paper } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useFetchAbilityDescriptions } from 'api/useFetchAbilityDescriptions';
import { useFetchPokemon } from 'api/useFetchPokemon';
import { useFetchTypes } from 'api/useFetchTypes';
import loader from 'assets/loader.gif';
import { getDataGridColumns } from 'helper/getDataGridColumns';
import { getPokemonList, reduceArray } from 'helper/helper';
import { type Pokemon, type PokemonListsTemplate } from 'models/models';
import React, { useState } from 'react';
import { GridTitleCard } from './GridTitleCard';

interface PokemonDataGridProps {
	list: keyof PokemonListsTemplate,
	title: string,
}

export const PokemonDataGrid = (props: PokemonDataGridProps): React.JSX.Element => {
	const [isLoadingPokemon, setIsLoadingPokemon] = useState<boolean>(true);
	const [isLoadingAbilityDescriptions, setIsLoadingAbilityDescriptions] = useState<boolean>(true);
	const [isLoadingTypes, setIsLoadingTypes] = useState<boolean>(true);
	const isLoading = isLoadingPokemon || isLoadingAbilityDescriptions || isLoadingTypes;
	const setIsLoadingFunctions = [setIsLoadingPokemon, setIsLoadingAbilityDescriptions, setIsLoadingTypes];

	const pokemonList = getPokemonList(props.list);
	const pokemon = useFetchPokemon({ pokemonList, setIsLoadingPokemon });

	const abilities = reduceArray(pokemon.map(mon => mon.abilities));
	const abilitiesWithDescriptions = useFetchAbilityDescriptions({ abilities, setIsLoadingAbilityDescriptions });

	const typesList = reduceArray(pokemon.map(mon => mon.types));
	const types = useFetchTypes({ typesList, setIsLoadingTypes });

	const columns: GridColDef[] = getDataGridColumns(abilitiesWithDescriptions, types);

	return (
		<>
			{!isLoading ? (
				<>
					<GridTitleCard title={props.title} setIsLoadingFunctions={setIsLoadingFunctions} />
					<Paper elevation={3} sx={{ m: 5, backgroundColor: '#B8D8D8' }}>
						<Box height={700} sx={{
							'& .header': {
								backgroundColor: '#7A9E9f'
							}
						}}>
							<DataGrid
								getRowId={(row: Pokemon) => row.name + row.sprite}
								rows={pokemon}
								columns={columns}
								initialState={{
									pagination: {
										paginationModel: {
											page: 0,
											pageSize: 30,
										},
									},
								}}
								pageSizeOptions={[10, 20, 30, 40, 50]}
								hideFooterSelectedRowCount
								rowHeight={100}
							/>
						</Box>
					</Paper>
				</>
			) : (
				<Box display='flex' justifyContent='center' m={3}>
					<img src={loader} alt='loading' width={800} height={600} />
				</Box>
			)}
		</>
	);
};
