import { createContext, useCallback, useContext, useReducer } from 'react';
import { ampsControllerReducer } from './ampsControllerReducer';
import type { AmpsControllerState, AmpsServer, QueryBuilderState } from './types';

interface AmpsControllerContextState extends AmpsControllerState {
	updateQBState: (queryBuilder: Partial<QueryBuilderState>) => void;
}
export const AmpsControllerContext = createContext({} as AmpsControllerContextState);
export const useAmpsControllerContext = () => useContext(AmpsControllerContext);

export function useAmpsControllerState(): AmpsControllerContextState {
	const [state, dispatch] = useReducer(ampsControllerReducer, DEFAULT_STATE);

	const updateQBState = useCallback((queryBuilder: Partial<QueryBuilderState>) => {
		dispatch({ type: 'UPDATE-QB', payload: queryBuilder });
	}, []);

	return {
		...state,
		updateQBState,
	};
}

const createEmptyAmpServer = (): AmpsServer => ({
	name: 'Not saved',
	url: '',
	empty: true,
});
const DEFAULT_STATE: AmpsControllerState = {
	queryBuilder: {
		server: createEmptyAmpServer(),
	},
};
