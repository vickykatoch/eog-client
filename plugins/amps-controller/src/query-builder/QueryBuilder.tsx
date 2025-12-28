import type { FC } from 'react';
import { QBBlotter, QBParams } from './components';

const QueryBuilder: FC = () => {
	return (
		<>
			<QBParams />
			<QBBlotter />
		</>
	);
};

export default QueryBuilder;
