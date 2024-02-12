import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ErrorPage } from 'components/ErrorPage';
import { PokemonDataGrid } from 'components/PokemonDataGrid';
import { type PokemonListsTemplate } from 'models/models';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App';
import './App.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: 'gen1',
				element: <PokemonDataGrid title={'gen1List' as keyof PokemonListsTemplate} />
			},
			{
				path: 'gen2',
				element: <PokemonDataGrid title={'gen2List' as keyof PokemonListsTemplate} />
			},
			{
				path: 'gen3',
				element: <PokemonDataGrid title={'gen3List' as keyof PokemonListsTemplate} />
			},
			{
				path: 'gen4',
				element: <PokemonDataGrid title={'gen4List' as keyof PokemonListsTemplate} />
			},
			{
				path: 'gen5',
				element: <PokemonDataGrid title={'gen5List' as keyof PokemonListsTemplate} />
			},
			{
				path: 'gen6',
				element: <PokemonDataGrid title={'gen6List' as keyof PokemonListsTemplate} />
			},
			{
				path: 'gen7',
				element: <PokemonDataGrid title={'gen7List' as keyof PokemonListsTemplate} />
			},
			{
				path: 'gen8',
				element: <PokemonDataGrid title={'gen8List' as keyof PokemonListsTemplate} />
			},
			{
				path: 'gen9',
				element: <PokemonDataGrid title={'gen9List' as keyof PokemonListsTemplate} />
			},
			{
				path: 'megas',
				element: <PokemonDataGrid title={'megasList' as keyof PokemonListsTemplate} />
			},
			{
				path: 'fossils',
				element: <PokemonDataGrid title={'fossilsList' as keyof PokemonListsTemplate} />
			},
			{
				path: 'legendaries',
				element: <PokemonDataGrid title={'legendariesList' as keyof PokemonListsTemplate} />
			},
			{
				path: 'regionals',
				element: <PokemonDataGrid title={'regionalsList' as keyof PokemonListsTemplate} />
			},
		]
	},
]);

createRoot(document.getElementById('root') as Element).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
