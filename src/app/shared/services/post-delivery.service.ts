import { Injectable } from "@angular/core";
import { IPostItem, ITag } from "../../post/model/interfaces";
import { FirebaseDatabase } from "angularfire2";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";

@Injectable()
export class PostDeliveryService {

constructor(private db: AngularFireDatabase){

}

editablePost: IPostItem;
posts = [
    {id: '0', title: 'Tytuł pierwszego posta', content: 'Treść pierwszego posta', tags: [{id: '1', name: 'tag pierwszy'}, {id: '2', name: 'tag drugi'}], creationDate: '2018-03-22 23:34:54'},
    {id: '1', title: 'Tytuł drugiego posta', content: 'Treść drugiego posta', tags: [{id: '2', name: 'tag drugi'}], creationDate: '2017-12-22 10:00:12'},
    {id: '2', title: 'Tytuł trzeciego posta', content: 'Treść trzeciego posta', tags: [{id: '2', name: 'tag drugi'}, {id: '3', name: 'tag trzeci'}], creationDate: '2017-05-22 14:33:21'},
    {id: '3', title: 'Tytuł czwartego posta', content: 'Treść czwartego posta', tags: [{id: '1', name: 'tag pierwszy'}, {id: '3', name: 'tag trzeci'}], creationDate: '2017-03-31 21:45:20'}
];
//posts: AngularFireList<any[]>;
//posts;
tags: ITag[] = [];

getPosts() {
    return this.posts;
}

// getPosts(): Observable<any[]> {

//     let w = this.db.list('posts').snapshotChanges().subscribe(res => {
//         return res;
//     });

//     let z = this.db.list('posts').snapshotChanges().pipe(map(ox => {return ox})).subscribe(res => {
//         return res;
//     });

//     let x = this.db.list('posts').valueChanges().subscribe(res => {
//         return res;
//     });

//     let y = this.db.list('posts').valueChanges().pipe(map(x => {return x}));

//     this.posts = this.db.list('posts');
//     return y;
// }

setActivePost(incomingPost: IPostItem){
    this.editablePost = incomingPost;
}

// deletePost(incomingPost: IPostItem){
//     const idx = this.posts.indexOf(incomingPost);
//     this.posts.splice(idx, 1);
// }

// setTagsArray(data: ITag[]){
//     this.tags = data;
// }

modifyPostTagsArray(postId: any, tagsArray: ITag[]){
    //let postIdx = this.posts.findIndex(x => x.id == postId);
    //this.posts[postIdx].tags = tagsArray;
}

get getPostToEdit(){
    return this.editablePost;
}

// get newPostIdToAssign(){
//     let data;
//     return data;
// }

}
