import { Action } from '@ngrx/store';

export interface IState {
    nthing: null
}

const initialState = {
    nthing: null
};

export function homeReducer(state = initialState, action: Action) {
    return state;
}

export const nothing = (state: IState) => state.nthing;