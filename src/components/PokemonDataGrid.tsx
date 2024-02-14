import { Box, Grid, Paper, Typography } from '@mui/material';
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
// add header of page to know where you are
interface PokemonDataGridProps {
	list: keyof PokemonListsTemplate,
	title: string,
}

export const PokemonDataGrid = (props: PokemonDataGridProps): React.JSX.Element => {
	const [isLoadingPokemon, setIsLoadingPokemon] = useState<boolean>(true);
	const [isLoadingAbilities, setIsLoadingAbilities] = useState<boolean>(true);
	const [isLoadingAbilityDescriptions, setIsLoadingAbilityDescriptions] = useState<boolean>(true);
	const isLoading = isLoadingPokemon || isLoadingAbilities || isLoadingAbilityDescriptions;

	const pokemonList = getPokemonList(props.list);
	const pokemon: Pokemon[] = useFetchPokemon({ pokemonList, setIsLoadingPokemon });
	const abilities = useFetchAbilities({ setIsLoadingAbilities });
	const abilitiesWithDescriptions = useFetchAbilityDescriptions({ abilities, setIsLoadingAbilityDescriptions });
	const columns: GridColDef[] = getColumns(abilitiesWithDescriptions);

	return (
		<>
			{!isLoading ? (
				<>
					<Grid container display='flex' justifyContent='center' alignItems='center'>
						<Grid item xs={2}>
							<Paper elevation={3} sx={{ mt: 3, p: 4, backgroundColor: '#B8D8D8', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
								<Typography variant='h6'>
									{props.title}
								</Typography>
							</Paper>
						</Grid>
					</Grid>
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
