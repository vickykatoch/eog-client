import { Button } from '@salt-ds/core';
import type { FC } from 'react';

export const QBFooter: FC = () => {
	return (
		<footer className="flex no-shrink p-1 bar-1">
			<div className="grow"></div>
			<div className="no-shrink">
				<Button>Execute</Button>
			</div>
		</footer>
	);
};
