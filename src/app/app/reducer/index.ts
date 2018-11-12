import { IAppState } from "../../app/app-state";
import * as fromAppReducer from "./app.reducer";
import { createSelector } from "@ngrx/store";

export interface IAppStateWithApp extends IAppState {
    app: fromAppReducer.IState;
}

export const appWithAppReducer = fromAppReducer.appReducer;

export const getAppState = (state: IAppStateWithApp) => state.app;
export const getAppPosts = createSelector(getAppState, fromAppReducer.getPosts);
export const getAppHomeTags = createSelector(getAppState, fromAppReducer.getHomeTags);