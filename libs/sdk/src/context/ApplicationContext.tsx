import { SaltProviderNext } from '@salt-ds/core';
import { createContext, type ReactNode, useCallback, useContext, useState } from 'react';

interface AppContextType {
	mode: 'light' | 'dark';
	toggleThemeMode: () => void;
}
export const ApplicationContext = createContext<AppContextType>({} as AppContextType);
export const useAppContext = () => useContext(ApplicationContext);
const AppHost = ({ children }: { children: ReactNode }) => {
	return <div className="flex grow col">{children}</div>;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
	const [mode, setMode] = useState<'light' | 'dark'>('dark');

	const toggleMode = useCallback(() => {
		setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
	}, []);

	return (
		<SaltProviderNext
			accent="teal"
			corner="rounded"
			headingFont="Amplitude"
			actionFont="Amplitude"
			mode={mode}
			applyClassesTo="root"
			density="high"
		>
			<ApplicationContext.Provider value={{ mode, toggleThemeMode: toggleMode }}>
				<AppHost>{children}</AppHost>
			</ApplicationContext.Provider>
		</SaltProviderNext>
	);
};
