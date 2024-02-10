import { Box, Paper } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useFetchAbilities } from 'api/useFetchAbilities';
import { useFetchAbilityDescriptions } from 'api/useFetchAbilityDescriptions';
import { useFetchPokemon } from 'api/useFetchPokemon';
import { gen8List } from 'data';
import { type Pokemon } from 'models';
import loader from 'assets/loader.gif';
import React from 'react';
import { getColumns } from 'helper';

export const Gen8 = (): React.JSX.Element => {
	const pokemon: Pokemon[] = useFetchPokemon(gen8List);
	const abilities = useFetchAbilities();
	const descriptions = useFetchAbilityDescriptions(abilities);
	const columns: GridColDef[] = getColumns(descriptions);

	return (
		<>
			{pokemon && descriptions ? (
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
