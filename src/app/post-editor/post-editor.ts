import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "../../../node_modules/@angular/forms";
import { IPostItem, ITag } from "../post/model/interfaces";
import { ActivatedRoute, Router } from "../../../node_modules/@angular/router";
import { PostDeliveryService } from "../shared/services/post-delivery.service";
import * as moment from 'moment';
import { Store } from "@ngrx/store";
import * as PostActions from '../../app/app/actions/app.actions';

@Component({
    selector: 'post-editor',
    templateUrl: 'post-editor.html'
})
export class PostEditorComponent implements OnInit{

    post: IPostItem;
    mode: PostEditMode;
    postForm: FormGroup;
    tagsArrayForm: FormGroup;
    title: string;
    content: string;
    buttonCaption: string;
    tagsAvailable: any[];
    postTagsSelected: any[];
    now: any;

    constructor(private fb: FormBuilder, 
        private route: ActivatedRoute,
        private postService: PostDeliveryService,
        private router: Router,
        private store: Store<any>){}

    ngOnInit(){

        this.tagsAvailable = [];
        this.postTagsSelected = [];
        let paramMode = this.route.snapshot.params['mode'];
        this.mode = parseInt(paramMode,10);
        this.post = this.postService.getPostToEdit;

        this.tagsAvailable = this.postService.tags;
            this.tagsAvailable.map(x => x['isSelected'] = false);
            
        if(this.mode == PostEditMode.Edit){
            this.tagsAvailable.forEach(y => this.isIncomingTagSelected(y));
            this.title = this.post.title;
            this.content = this.post.content;
            this.buttonCaption = 'Zapisz zmiany';
        } else {
            this.title = '',
            this.content = ''
            this.buttonCaption = 'Zapisz post';
        }

        this.postForm = this.fb.group({
            postTitle: [this.title, [Validators.required, Validators.maxLength(256)]],
            postContent: this.content
        });
    }

    get idTagsSelected(){
        return <FormArray>this.tagsArrayForm.get('idTagsSelected');
    }

    confirmationButtonClicked(){
        switch(this.mode){
            case PostEditMode.Edit: {
                // this.postService.posts.forEach(pst => {
                //     if(this.post.id == pst.id){
                //         pst.title = this.postForm.controls.postTitle.value;
                //         pst.content = this.postForm.controls.postContent.value;
                //     }
                // });
                this.store.dispatch(new PostActions.UpdatePost({
                    id: this.post.id,
                    title: this.postForm.controls.postTitle.value,
                    content: this.postForm.controls.postContent.value,
                    tags: this.postTagsSelected,
                    creationDate: "Dupa"
                }))
                this.updatePostTagsArray();
                this.postService.modifyPostTagsArray(this.post.id, this.postTagsSelected);
                this.router.navigate(['admin']);
                break;
            }
            case PostEditMode.New: {
                this.updatePostTagsArray();
                this.store.dispatch(new PostActions.AddPost({
                    id: 'Nowy',
                    title: this.postForm.controls.postTitle.value,
                    content: this.postForm.controls.postContent.value,
                    tags: this.postTagsSelected,
                    creationDate: moment().format("YYYY-MM-DD HH:mm:ss")
                }));
                // this.postService.posts.push({
                //     id: 'Nowy',
                //     title: this.postForm.controls.postTitle.value,
                //     content: this.postForm.controls.postContent.value,
                //     tags: this.postTagsSelected,
                //     creationDate: moment().format("YYYY-MM-DD HH:mm:ss")
                // });
                this.router.navigate(['admin']);
                break;
            }
        }
    }

    updatePostTagsArray(){
        this.tagsAvailable.forEach(x => {
            if(x.isSelected) {
                this.postTagsSelected.push(x);
            }})
    }

    deletePostButtonClicked(){
        //this.postService.deletePost(this.post);
        this.store.dispatch(new PostActions.DeletePost(
            this.post.id
        ));
        this.router.navigate(['admin']);
    }

    isIncomingTagSelected(incomingTag: ITag){
        let inspectionResult = this.post.tags.some(x => x.id == incomingTag.id);
        this.assignSelectionStatus(incomingTag, inspectionResult);
        return inspectionResult;
    }

    changeCheckboxSelection(incomingTag: ITag){
        let xx = parseInt(this.tagsAvailable.find(x => x.id == incomingTag.id).id, 10) - 1;
        let before = this.tagsAvailable[xx].isSelected; 
        this.tagsAvailable[xx].isSelected = !before
    }

    assignSelectionStatus(incomingTag: ITag, value: boolean){
        this.tagsAvailable.map(x => {
            if(x.id == incomingTag.id) {
               x.isSelected = value }}
            );
    }

    extrabutton(){
    }
}

export enum PostEditMode{
    New,
    Edit
}