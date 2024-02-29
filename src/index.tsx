import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ErrorPage } from 'components/ErrorPage';
import { PokemonDataGrid } from 'components/PokemonDataGrid';
import { type PokemonListsTemplate } from 'models/models';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { App } from './App';
import './App.css';

const router = createHashRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: 'gen1',
				element: <PokemonDataGrid list={'gen1List' as keyof PokemonListsTemplate} title='Gen 1' />
			},
			{
				path: 'gen2',
				element: <PokemonDataGrid list={'gen2List' as keyof PokemonListsTemplate} title='Gen 2' />
			},
			{
				path: 'gen3',
				element: <PokemonDataGrid list={'gen3List' as keyof PokemonListsTemplate} title='Gen 3' />
			},
			{
				path: 'gen4',
				element: <PokemonDataGrid list={'gen4List' as keyof PokemonListsTemplate} title='Gen 4' />
			},
			{
				path: 'gen5',
				element: <PokemonDataGrid list={'gen5List' as keyof PokemonListsTemplate} title='Gen 5' />
			},
			{
				path: 'gen6',
				element: <PokemonDataGrid list={'gen6List' as keyof PokemonListsTemplate} title='Gen 6' />
			},
			{
				path: 'gen7',
				element: <PokemonDataGrid list={'gen7List' as keyof PokemonListsTemplate} title='Gen 7' />
			},
			{
				path: 'gen8',
				element: <PokemonDataGrid list={'gen8List' as keyof PokemonListsTemplate} title='Gen 8' />
			},
			{
				path: 'gen9',
				element: <PokemonDataGrid list={'gen9List' as keyof PokemonListsTemplate} title='Gen 9' />
			},
			{
				path: 'megas',
				element: <PokemonDataGrid list={'megasList' as keyof PokemonListsTemplate} title='Megas' />
			},
			{
				path: 'fossils',
				element: <PokemonDataGrid list={'fossilsList' as keyof PokemonListsTemplate} title='Fossils' />
			},
			{
				path: 'legendaries',
				element: <PokemonDataGrid list={'legendariesList' as keyof PokemonListsTemplate} title='Legendaries' />
			},
			{
				path: 'regionals',
				element: <PokemonDataGrid list={'regionalsList' as keyof PokemonListsTemplate} title='Regionals' />
			},
		]
	},
]);

createRoot(document.getElementById('root') as Element).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
