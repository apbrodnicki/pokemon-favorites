import { Box, Paper, Typography } from '@mui/material';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { PokemonDataGrid } from 'components/PokemonDataGrid';
import { UpdatePokemon } from 'components/UpdatePokemon';
import { CustomSnackbar } from 'components/custom/CustomSnackbar';
import React, { useState } from 'react';
import { useOutlet } from 'react-router-dom';

export const App = (): React.JSX.Element => {
	const outlet = useOutlet();

	const [pokemonList, setPokemonList] = useState<string[]>(() => {
		const list = localStorage.getItem('pokemon-favorites_list');

		return (list !== null) ? JSON.parse(list) : [];
	});

	const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
	const [snackbarMessage, setSnackbarMessage] = useState<string>('');
	const [snackbarColor, setSnackbarColor] = useState<'success' | 'info' | 'warning' | 'error'>('success');

	return (
		<>
			<Header />
			{outlet ?? (
				<>
					<UpdatePokemon
						pokemonList={pokemonList}
						setPokemonList={setPokemonList}
						setSnackbarOpen={setSnackbarOpen}
						setSnackbarMessage={setSnackbarMessage}
						setSnackbarColor={setSnackbarColor}
					/>
					{pokemonList.length > 0 ? (
						<PokemonDataGrid
							pokemonList={pokemonList}
							setPokemonList={setPokemonList}
							setSnackbarOpen={setSnackbarOpen}
							setSnackbarMessage={setSnackbarMessage}
							setSnackbarColor={setSnackbarColor}
						/>
					) : (
						<Paper elevation={3} sx={{ m: 5, backgroundColor: '#B8D8D8' }}>
							<Box p={5}>
								<Typography align='center'>
								Add some Pokémon to learn more about them!
								</Typography>
							</Box>
						</Paper>
					)}
					<CustomSnackbar
						snackbarOpen={snackbarOpen}
						setSnackbarOpen={setSnackbarOpen}
						severity={snackbarColor}
						message={snackbarMessage}
					/>
				</>
			)}
			<Footer />
		</>
	);
};
