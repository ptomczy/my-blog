import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { PostDeliveryService } from "./post-delivery.service";
import { Store } from "@ngrx/store";
import * as fromAppReducer from "../../app/reducer";
import * as PostActions from '../../../app/app/actions/app.actions';
import { IPostItem } from "src/app/post/model/interfaces";


@Injectable()
export class PostsResolve implements Resolve<any> {
    constructor(private pds: PostDeliveryService, private store: Store<fromAppReducer.IAppStateWithApp> ){}

    resolve(route: ActivatedRouteSnapshot){
        // console.log('Resolver zadziałał' + route.params);
        // let psts = this.pds.getPosts().subscribe(posts => {
        //     return posts});
        // console.log('To są posty z resolvera' + psts);
        // return psts;
    }
    
}