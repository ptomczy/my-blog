import { Component, OnInit, AfterViewInit } from "@angular/core";
import { IPostItem, ITag } from "../post/model/interfaces";
import { PostDeliveryService } from "../shared/services/post-delivery.service";
import { Store } from "@ngrx/store";
//import { getPosts } from "../admin/reducer/admin.reducer";
import { Observable } from "rxjs";
import { map, filter } from 'rxjs/operators';
import { getPosts } from "../app/reducer/app.reducer";
import { getHomeNothing } from "./reducer";
import * as fromAppReducer from "../app/reducer";
import { Action } from "rxjs/internal/scheduler/Action";
import * as PostActions from "../app/actions/app.actions";
import { PostsResolve } from "../shared/services/post-resolver.service";
import { ActivatedRoute } from "@angular/router";
import { AngularFireDatabase } from "angularfire2/database";

@Component({
    selector: 'home-page',
    templateUrl: 'home.html',
    styleUrls: ['./home.css']
})
export class HomePage implements OnInit, AfterViewInit {

    KWOhidden: boolean = true;
    posts$: Observable<IPostItem[]>;
    posts: IPostItem[];
    testHome$: Observable<any>;
    postsDisplayed: Array<IPostItem>;
    tags: any[];
    tagsDisplayed: any[];
    idsOfTagsDisplayed: any[];
    sortOptions: ISortOptions = {
        sortButtonCaption: 'Posortuj od najstarszych',
        sortDirection: SortDirections.descending
    };

    incomingButtonValue: string;

    constructor(private postService: PostDeliveryService, 
        private store: Store<fromAppReducer.IAppStateWithApp>,
        private route: ActivatedRoute,
        private db: AngularFireDatabase) { }

    displayIncomingButtonValue($event) {
        this.incomingButtonValue = $event;
    }

    ngOnInit() {
        this.route.data.subscribe(data => console.log('Wynik z routingu: ' + data));
        this.tags = [];
        //this.postService.setTagsArray(this.tags);
        this.tagsDisplayed = this.tags;

        
        this.posts$ = this.store.select(fromAppReducer.getAppPosts).pipe(
            map(posts => {
                this.uaktualnijPrzyciskiTagow(posts);
                //this.ustalWidocznePostyWgTagow_withReducer();
                return posts;
            })
        );

        this.store.dispatch(new PostActions.ModifyHomeTags(
            this.tagsDisplayed
        ));


        
        // this.testHome$ = this.store.select(getHomeNothing).pipe(map(
        //     x => { return x }
        // ))        
    }

    ngAfterViewInit() {
        this.tagsDisplayed.map(x => x['isPresented'] = true);
        //this.ustalWidocznePostyWgTagow(this.postsDisplayed);

    }

    changeOrderBy() {
        if (this.sortOptions.sortDirection == SortDirections.ascending) {
            this.sortOptions.sortDirection = SortDirections.descending;
            this.sortOptions.sortButtonCaption = 'Posortuj od najstarszych';
        } else {
            this.sortOptions.sortDirection = SortDirections.ascending;
            this.sortOptions.sortButtonCaption = 'Posortuj od najmłodszych';
        }
    }

    tagSelectionChange(tag: any) {
        let oldValue = tag.isPresented;
        this.tagsDisplayed.find(x => x.id == tag.id).isPresented = !oldValue;

        this.store.dispatch(new PostActions.ModifyHomeTags(
            this.tagsDisplayed
        ))
        //this.ustalWidocznePostyWgTagow(this.posts);
        this.ustalWidocznePostyWgTagow_withReducer()

    }

    ustalWidocznePostyWgTagow_withReducer(){
        
        this.store.select(fromAppReducer.getAppHomeTags).subscribe(tags => {
            let filtedTags = tags.filter(y => y.isPresented == true);
            
            this.posts$ = this.store.select(fromAppReducer.getAppPosts).pipe(
                map(posts => {
                    let result = posts.filter(post =>
                        post.tags.some(postTag => filtedTags.some(tag => postTag.id == tag.id)));

                    return result;
                })
            );           
        });
    }

    isButtonTagToBeSelected(tagId: number) {
        return this.tagsDisplayed.some(tag => tag.id == tagId);
    }

    uaktualnijPrzyciskiTagow(posts: IPostItem[]) {
        for (let step = 0; step < posts.length; step++) {

            let currentPost = posts[step];

            for (let inStep = 0; inStep < currentPost.tags.length; inStep++) {

                let currentTag = currentPost.tags[inStep];

                let newTag = this.tags.some(tag => currentTag.id == tag.id);

                if (!newTag) {
                    this.tags.push(currentTag);
                }
            }
        }
    }

}

export interface ISortOptions {
    sortButtonCaption: string,
    sortDirection: SortDirections;
}

export enum SortDirections {
    ascending = 'asc',
    descending = 'desc'
}