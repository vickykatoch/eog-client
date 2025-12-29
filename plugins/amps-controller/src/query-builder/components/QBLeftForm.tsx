import { Panel, RadioButton, RadioButtonGroup } from '@salt-ds/core';
import type { FC } from 'react';

export const QBLeftForm: FC = () => {
	return (
		<div className="flex no-shrink bdr">
			<Panel className="flex no-shrink" variant="secondary">
				<RadioButtonGroup>
					<RadioButton label="Sow" value="sow" />
					<RadioButton label="Subscribe" value="subscribe" />
					<RadioButton label="Sow+Subscribe" value="sowandsubscribe" />
					<RadioButton label="Sow+Subscribe (Delta)" value="sowanddeltasubscribe" />
					<RadioButton label="SOW Stats" value="sowstats" />
				</RadioButtonGroup>
			</Panel>
		</div>
	);
};
