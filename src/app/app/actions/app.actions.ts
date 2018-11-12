import { Action } from '@ngrx/store';
import { IPostItem, ITag } from '../../post/model/interfaces';

export const LOAD_POSTS_ON_LAUNCH = 'LOAD_POSTS_ON_LAUNCH';
export const LOAD_POSTS_ON_LAUNCH_SUCCESS = 'LOAD_POSTS_ON_LAUNCH_SUCCESS';
export const LOAD_POSTS_ON_LAUNCH_FAILED = 'LOAD_POSTS_ON_LAUNCH_FAILED';

export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const LOAD_HOME_TAGS = 'LOAD_TAGS';
export const MODIFY_HOME_TAGS = 'MODIFY_HOME_TAGS';

export class LoadPostsOnLaunch implements Action {
    readonly type = LOAD_POSTS_ON_LAUNCH;

    constructor(public payload: IPostItem[]){}
}

export class LoadPostsOnLaunchSuccess implements Action { //jak to wykorzystać?
    readonly type = LOAD_POSTS_ON_LAUNCH_SUCCESS;

    constructor(public payload?: IPostItem[]){}
}

export class LoadPostsOnLaunchFailed implements Action { //jak to wykorzystać?
    readonly type = LOAD_POSTS_ON_LAUNCH_FAILED;

    constructor(public payload?: IPostItem[]){}
}
export class AddPost implements Action {
    readonly type = ADD_POST;

    constructor(public payload: IPostItem){}
}

export class UpdatePost implements Action {
    readonly type = UPDATE_POST;

    constructor(public payload: IPostItem){}
}

export class DeletePost implements Action {
    readonly type = DELETE_POST;

    constructor(public payload: string){}
}

export class ModifyHomeTags implements Action {
    readonly type = MODIFY_HOME_TAGS;

    constructor(public payload: ITag[]){}
}

export type AppActions = AddPost | UpdatePost | DeletePost
        | ModifyHomeTags | LoadPostsOnLaunch | LoadPostsOnLaunchSuccess | LoadPostsOnLaunchFailed;