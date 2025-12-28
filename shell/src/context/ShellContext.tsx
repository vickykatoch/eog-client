import { createContext, type Dispatch, type FC, useContext, useEffect, useReducer } from 'react';
import { loadEnabledPlugins } from '../utils/plugins-catalog';
import { shellReducer } from './shellReducer';
import type { ShellAction, ShellState } from './types';

interface AppContextType extends ShellState {
	updateState: Dispatch<ShellAction>;
}

export const ShellContext = createContext<AppContextType>({} as AppContextType);
export const useShellContext = () => useContext(ShellContext);

export const ShellContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
	const [state, dispatch] = useReducer(shellReducer, {
		loading: true,
		layout: 'vanilla',
		plugins: [],
	});

	useEffect(() => {
		loadEnabledPlugins()
			.then((plugins) => dispatch({ type: 'SET_PLUGINS', payload: plugins }))
			.catch((e) =>
				dispatch({
					type: 'SET_ERROR',
					payload: { type: 'PLUGINS_LOAD_ERROR', message: String(e) },
				}),
			);
	}, []);

	return (
		<ShellContext.Provider value={{ ...state, updateState: dispatch }}>
			{children}
		</ShellContext.Provider>
	);
};
