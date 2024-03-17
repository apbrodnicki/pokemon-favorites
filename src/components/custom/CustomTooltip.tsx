import { Tooltip, Zoom } from '@mui/material';
import React from 'react';

interface CustomTooltipProps {
	title: string,
	children: React.PropsWithChildren<React.JSX.Element>
}

export const CustomTooltip = (
	{ title, children }: CustomTooltipProps
): React.JSX.Element => {
	return (
		<Tooltip
			title={title}
			TransitionComponent={Zoom}
			placement='top'
			leaveDelay={100}
			arrow
		>
			{children}
		</Tooltip>
	);
};
