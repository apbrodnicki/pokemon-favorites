import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { Menu } from 'components/Menu';
import React from 'react';
import { useOutlet } from 'react-router-dom';

export const App = (): React.JSX.Element => {
	const outlet = useOutlet();

	return (
		<>
			<Header />
			{outlet ?? <Menu />}
			<Footer />
		</>
	);
};
