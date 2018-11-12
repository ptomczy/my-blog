import { IAppState } from "../../app/app-state";
import * as fromHome from "./home.reducer";
import { createSelector } from "@ngrx/store";

export interface IAppStateWithHome extends IAppState {
    home: fromHome.IState;
}

export const appWithHomeReducer = fromHome.homeReducer;

export const getHomeState = (state: IAppStateWithHome) => state.home;
export const getHomeNothing = createSelector(getHomeState, fromHome.nothing);


