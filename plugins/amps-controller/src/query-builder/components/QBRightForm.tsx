import { Dropdown, Input, Option, Panel } from '@salt-ds/core';
import type { FC } from 'react';

export const QBRightForm: FC = () => {
	return (
		<div className="flex no-shrink bdr">
			<Panel variant="secondary" className="flex col gap-sm">
				<Input placeholder="Bookmark: (optional)" bordered />
				<Input placeholder="Order By: (optional)" bordered />
				<Dropdown placeholder="Format: (optional)" bordered>
					<Option value="10">Top 10</Option>
					<Option value="25">Top 25</Option>
					<Option value="50">Top 50</Option>
					<Option value="100">Top 100</Option>
					<Option value="all">All</Option>
				</Dropdown>
			</Panel>
		</div>
	);
};
