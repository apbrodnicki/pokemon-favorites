import { Tooltip, Zoom } from '@mui/material';
import React from 'react';

interface TooltipProps {
	title: string,
	children: React.PropsWithChildren<React.JSX.Element>
}

export const CustomTooltip = (props: TooltipProps): React.JSX.Element => {
	return (
		<Tooltip title={props.title} TransitionComponent={Zoom} placement='top' leaveDelay={100} arrow>
			{props.children}
		</Tooltip>
	);
};
