import type { FC } from 'react';

interface Props {
	height?: number;
	width?: number;
}
export const Logo: FC<Props> = ({ width = 40, height = 40 }) => {
	return <img src="/helios.svg" alt="Helios Logo" style={{ width, height }} />;
};
