import type { FC } from 'react';
import { AmpsControllerContext, useAmpsControllerState } from './useAmpsControllerState';

export const AmpsControllerContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
	const state = useAmpsControllerState();
	return <AmpsControllerContext.Provider value={state}>{children}</AmpsControllerContext.Provider>;
};
