import { Component, Input } from "@angular/core";
import { IPostItem } from "../model/interfaces";

@Component({
    selector: 'post',
    templateUrl: 'post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent {
    @Input() post: IPostItem;
    @Input() postOptions: IPostComponentItemOptions;
    @Input() editDisabled: boolean;

recallDelete(postClicked: IPostItem){
    console.log('Delete recalled posta ' + postClicked);
}

recallEdit(postClicked: IPostItem){

    console.log('Edit recalled posta ' + postClicked);
    
}
}
export interface IPostComponentItemOptions {
    isEditButtonVisible?: boolean;
    isRemoveButtonVisible?: boolean;
    isTagsVisible?: boolean;
    isContentVisible?: boolean;
    isCreationDateVisible?: boolean;
}