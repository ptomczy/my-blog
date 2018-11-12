import * as AppActions from '../actions/app.actions';
import { IPostItem, ITag } from '../../post/model/interfaces';
import { PostDeliveryService } from 'src/app/shared/services/post-delivery.service';

export interface IState {
    posts: IPostItem[];
    homeTags: ITag[];
}

// const initialState = {
//     posts: [],
//     homeTags: []
// }

export class InitialState {
    constructor(private pds: PostDeliveryService){
    }

}
const initialState = {
    posts: [
        {id: '0', title: 'Tytuł pierwszego posta', content: 'Treść pierwszego posta', tags: [{id: '1', name: 'tag pierwszy'}, {id: '2', name: 'tag drugi'}], creationDate: '2018-03-22 23:34:54'},
        {id: '1', title: 'Tytuł drugiego posta', content: 'Treść drugiego posta', tags: [{id: '2', name: 'tag drugi'}], creationDate: '2017-12-22 10:00:12'},
        {id: '2', title: 'Tytuł trzeciego posta', content: 'Treść trzeciego posta', tags: [{id: '2', name: 'tag drugi'}, {id: '3', name: 'tag trzeci'}], creationDate: '2017-05-22 14:33:21'},
        {id: '3', title: 'Tytuł czwartego posta', content: 'Treść czwartego posta', tags: [{id: '1', name: 'tag pierwszy'}, {id: '3', name: 'tag trzeci'}], creationDate: '2017-03-31 21:45:20'}
    ],
    homeTags: []
}

export function appReducer(state = initialState, action: AppActions.AppActions) {

    switch (action.type) {
        case AppActions.LOAD_POSTS_ON_LAUNCH:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            };
        
        case AppActions.ADD_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            };
        case AppActions.UPDATE_POST:
            const oldPost = state.posts[action.payload.id];
            const updatedPost = {...oldPost,...action.payload}
            const existingPosts = [...state.posts];
            existingPosts[action.payload.id] = updatedPost;
            return {
                ...state,
                posts: existingPosts
            };
        case AppActions.DELETE_POST:
            const existingPostsBeforeDeleting = state.posts;
            let index = existingPostsBeforeDeleting.findIndex((item)=>{
                return action.payload == item.id;
            })
            existingPostsBeforeDeleting.splice(index, 1);
            return {
                ...state,
                posts: [...existingPostsBeforeDeleting]
            }
        case AppActions.MODIFY_HOME_TAGS:
            const updatedHomeTags = action.payload;
            return {
                ...state,
                homeTags: updatedHomeTags
            }
        default:
            return state;
    }
}

export const getPosts = (state: IState) => state.posts;
export const getHomeTags = (state: IState) => state.homeTags;