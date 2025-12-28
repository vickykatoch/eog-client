import { Input, Label } from '@salt-ds/core';
import { DoubleChevronDownIcon, DoubleChevronUpIcon } from '@salt-ds/icons';
import type { FC } from 'react';

interface Props {
	label: string;
	collapsed?: boolean;
	onToggleVisibility?: () => void;
}

export const QBHeader: FC<Props> = ({ label, collapsed, onToggleVisibility }) => {
	return (
		<header className="flex no-shrink bar-1 justify-center-v p-1">
			<Label className="no-shrink">{label}</Label>
			<Input className="flex-grow mx-2" placeholder="Amps Url..." />
			{collapsed ? (
				<DoubleChevronDownIcon onClick={onToggleVisibility} style={{ cursor: 'pointer' }} />
			) : (
				<DoubleChevronUpIcon onClick={onToggleVisibility} style={{ cursor: 'pointer' }} />
			)}
		</header>
	);
};
