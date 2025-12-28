import type { AmpsControllerAction, AmpsControllerState } from './types';

export function ampsControllerReducer(
	state: AmpsControllerState,
	action: AmpsControllerAction,
): AmpsControllerState {
	switch (action.type) {
		case 'UPDATE-QB':
			return {
				...state,
				queryBuilder: { ...state.queryBuilder, ...action.payload },
			};
		default:
			return state;
	}
}
