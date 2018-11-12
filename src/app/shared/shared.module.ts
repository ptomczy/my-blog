import { NgModule } from "@angular/core";
import { PostComponent } from "../post/components/post.component";
import { PostDeliveryService } from "./services/post-delivery.service";
import { CommonModule } from "@angular/common";
import { OrderByDatePipe } from "./pipes/sort-by-date.pipe";

@NgModule({
    declarations: [
        PostComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        PostComponent
    ],
    entryComponents: [
        PostComponent
    ],
    providers: [
        PostDeliveryService
    ]
})
export class SharedModule {

}