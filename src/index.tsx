import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App';
import { ErrorPage } from 'components/ErrorPage';
import { Gen1 } from 'components/gens/Gen1';
import { Gen2 } from 'components/gens/Gen2';
import { Gen3 } from 'components/gens/Gen3';
import { Gen4 } from 'components/gens/Gen4';
import { Gen5 } from 'components/gens/Gen5';
import { Gen6 } from 'components/gens/Gen6';
import { Gen7 } from 'components/gens/Gen7';
import { Gen8 } from 'components/gens/Gen8';
import { Gen9 } from 'components/gens/Gen9';
import { Megas } from 'components/misc/Megas';
import { Fossils } from 'components/misc/Fossils';
import { Legendaries } from 'components/misc/Legendaries';
import { Regionals } from 'components/misc/Regionals';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: 'gen1',
				element: <Gen1 />
			},
			{
				path: 'gen2',
				element: <Gen2 />
			},
			{
				path: 'gen3',
				element: <Gen3 />
			},
			{
				path: 'gen4',
				element: <Gen4 />
			},
			{
				path: 'gen5',
				element: <Gen5 />
			},
			{
				path: 'gen6',
				element: <Gen6 />
			},
			{
				path: 'gen7',
				element: <Gen7 />
			},
			{
				path: 'gen8',
				element: <Gen8 />
			},
			{
				path: 'gen9',
				element: <Gen9 />
			},
			{
				path: 'megas',
				element: <Megas />
			},
			{
				path: 'fossils',
				element: <Fossils />
			},
			{
				path: 'legendaries',
				element: <Legendaries />
			},
			{
				path: 'regionals',
				element: <Regionals />
			},
		]
	},
]);

createRoot(document.getElementById('root') as Element).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
