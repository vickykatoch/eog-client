import { SaltProviderNext } from '@salt-ds/core';
import { createContext, type ReactNode, useContext } from 'react';
import { type AppContextType, useStateHandler } from './useContextState';

export const ApplicationContext = createContext<AppContextType>({} as AppContextType);
export const useAppContext = () => useContext(ApplicationContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
	const state = useStateHandler();
	const { mode, density } = state.themeSettings;
	return (
		<SaltProviderNext
			accent="teal"
			corner="rounded"
			headingFont="Amplitude"
			actionFont="Amplitude"
			mode={mode}
			applyClassesTo="root"
			density={density}
		>
			<ApplicationContext.Provider value={state}>{children}</ApplicationContext.Provider>
		</SaltProviderNext>
	);
};
