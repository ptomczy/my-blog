import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { IPostItem } from "../post/model/interfaces";
import { PostDeliveryService } from "../shared/services/post-delivery.service";
import { IPostComponentItemOptions } from "../post/components/post.component";
import { Router } from "../../../node_modules/@angular/router";
import { PostEditMode } from "../post-editor/post-editor";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { getPosts } from "../app/reducer/app.reducer";
import * as PostActions from "../app/actions/app.actions";
import * as fromAppReducer from "../app/reducer";

@Component({
    selector: 'admin',
    templateUrl: 'admin.html'
})
export class AdminPage implements OnInit{

    @Output() postMode: EventEmitter<IPostItem>= new EventEmitter();
    posts: IPostItem[];
    posts$: Observable<IPostItem[]>;
    showB: boolean = false;
    options: IPostComponentItemOptions;
    selectedPost: IPostItem;
    
    constructor(private postService: PostDeliveryService, private router: Router, private store: Store<fromAppReducer.IAppStateWithApp>){
    }

    ngOnInit(){
        //this.posts = this.postService.getPosts();
        this.posts$ = this.store.select(fromAppReducer.getAppPosts);
        this.options = {
            isEditButtonVisible: true,
            isTagsVisible: true,
            isContentVisible: false,
            isCreationDateVisible: false
        };
        
    }

    postClicked(postClicked: IPostItem){
        this.selectedPost = postClicked;
    }

    addNewPost(){
        this.router.navigate(['admin/postEditor', PostEditMode.New]);
    }

    editPost(post: IPostItem){
        this.postService.setActivePost(post);
        this.router.navigate(['admin/postEditor', PostEditMode.Edit]);
    }

    deletePost(post: IPostItem){
        //this.postService.deletePost(this.selectedPost);
        this.store.dispatch(new PostActions.DeletePost(this.selectedPost.id));
    }
}