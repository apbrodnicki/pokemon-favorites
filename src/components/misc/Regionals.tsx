import { Box, Paper } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useFetchAbilities } from 'api/useFetchAbilities';
import { useFetchAbilityDescriptions } from 'api/useFetchAbilityDescriptions';
import { useFetchPokemon } from 'api/useFetchPokemon';
import { regionals } from 'data';
import { type Pokemon } from 'models/models';
import loader from 'assets/loader.gif';
import React, { useState } from 'react';
import { getColumns } from 'helper';

export const Regionals = (): React.JSX.Element => {
	const [isLoadingPokemon, setIsLoadingPokemon] = useState<boolean>(false);
	const pokemon: Pokemon[] = useFetchPokemon(regionals, setIsLoadingPokemon);
	const abilities = useFetchAbilities();
	const abilitiesWithDescriptions = useFetchAbilityDescriptions(abilities);
	const columns: GridColDef[] = getColumns(abilitiesWithDescriptions);

	return (
		<>
			{!isLoadingPokemon ? (
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
