import { Box, Paper } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useFetchAbilities } from 'api/useFetchAbilities';
import { useFetchAbilityDescriptions } from 'api/useFetchAbilityDescriptions';
import { useFetchPokemon } from 'api/useFetchPokemon';
import loader from 'assets/loader.gif';
import { getColumns, getPokemonList } from 'helper';
import { type Pokemon, type PokemonListsTemplate } from 'models/models';
import React, { useState } from 'react';
// pokeapi call on types, programmatically get double type stats, do it in helper
// https://stackoverflow.com/questions/69952120/render-pokemon-double-type-weaknesses-resistances-in-react

interface PokemonDataGridProps {
	title: keyof PokemonListsTemplate,
}

export const PokemonDataGrid = (props: PokemonDataGridProps): React.JSX.Element => {
	const [isLoadingPokemon, setIsLoadingPokemon] = useState<boolean>(false);
	const [isLoadingAbilities, setIsLoadingAbilities] = useState<boolean>(false);
	const [isLoadingAbilityDescriptions, setIsLoadingAbilityDescriptions] = useState<boolean>(false);
	const isLoading = isLoadingPokemon || isLoadingAbilities || isLoadingAbilityDescriptions;

	const pokemonList = getPokemonList(props.title);
	const pokemon: Pokemon[] = useFetchPokemon({ pokemonList, setIsLoadingPokemon });
	const abilities = useFetchAbilities({ setIsLoadingAbilities });
	const abilitiesWithDescriptions = useFetchAbilityDescriptions({ abilities, setIsLoadingAbilityDescriptions });
	const columns: GridColDef[] = getColumns(abilitiesWithDescriptions);

	return (
		<>
			{!isLoading ? (
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
				</Paper >
			) : (
				<Box display='flex' justifyContent='center'>
					<img src={loader} alt='loading' width={800} height={600} />
				</Box>
			)}
		</>
	);
};
