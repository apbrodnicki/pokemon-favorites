import React from 'react';
import { useOutlet } from 'react-router-dom';
import { Header } from 'components/Header';
import { Menu } from 'components/Menu';
import { Footer } from 'components/Footer';
// weird hover click thing with menu items, i asked wyatt
export const App = (): React.JSX.Element => {
	const outlet = useOutlet();

	return (
		<>
			<Header />
			{(outlet != null) || <Menu />}
			<Footer />
		</>
	);
};
