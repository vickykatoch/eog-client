import { Dropdown, FormField, Input, Option, Panel } from '@salt-ds/core';
import type { FC } from 'react';

export const QBMiddleForm: FC = () => {
	return (
		<div className="flex grow col">
			<Panel variant="secondary" className="flex col bdr gap-sm">
				<FormField>
					<Input
						placeholder="Topic: (required)"
						startAdornment={
							<Dropdown placeholder="Topic">
								<Option value="json">json</Option>
								<Option value="nvfix">nvfix</Option>
								<Option value="xml">xml</Option>
							</Dropdown>
						}
						bordered
					/>
				</FormField>
				<FormField>
					<Input placeholder="Content Filter: (optional)" bordered />
				</FormField>
				<FormField>
					<Input placeholder="Options (comma separated): (optional)" bordered />
				</FormField>
			</Panel>
		</div>
	);
};
