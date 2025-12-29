import { type FC, useCallback, useState } from 'react';
import { QBFooter } from './QBFooter';
import { QBHeader } from './QBHeader';
import { QBLeftForm } from './QBLeftForm';
import { QBMiddleForm } from './QBMiddleForm';
import { QBRightForm } from './QBRightForm';

export const QBParams: FC = () => {
	const [collapsed, setCollapsed] = useState(false);

	const handleToggleVisibility = useCallback(() => {
		setCollapsed((p) => !p);
	}, []);

	return (
		<div className="flex no-shrink col bdr">
			<QBHeader
				label="Query Builder"
				onToggleVisibility={handleToggleVisibility}
				collapsed={collapsed}
			/>
			{!collapsed && (
				<>
					<div className="flex no-shrink p-1 gap-md">
						<QBLeftForm />
						<QBMiddleForm />
						<QBRightForm />
					</div>
					<QBFooter />
				</>
			)}
		</div>
	);
};
