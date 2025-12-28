import { type FC, useCallback, useState } from 'react';
import { QBForm } from './QBForm';
import { QBHeader } from './QBHeader';
import { QueryTypes } from './QueryTypes';

export const QBParams: FC = () => {
	const [collapsed, setCollapsed] = useState(false);

	const handleToggleVisibility = useCallback(() => {
		setCollapsed((p) => !p);
	}, []);

	return (
		<div className="flex no-shrink col">
			<QBHeader
				label="Query Builder"
				onToggleVisibility={handleToggleVisibility}
				collapsed={collapsed}
			/>
			{!collapsed && (
				<div className="flex grow">
					<QueryTypes />
					<QBForm />
				</div>
			)}
		</div>
	);
};
