import { Box, LinearProgress, Typography } from '@mui/material';
import { getProgressColor } from 'helper/helper';
import React from 'react';

interface StatCellProps {
	statValue: number
}

export const StatCell = (props: StatCellProps): React.JSX.Element => (
	<Box width='100%'>
		<Typography my={1} textAlign='center'>{props.statValue}</Typography>
		<LinearProgress
			variant='determinate'
			value={props.statValue / 255 * 100}
			sx={{
				height: 30,
				'& .MuiLinearProgress-bar1Determinate': {
					backgroundColor: getProgressColor(props.statValue / 255 * 100)
				}
			}}
		/>
	</Box>
);
