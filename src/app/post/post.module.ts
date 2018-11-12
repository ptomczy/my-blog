import { NgModule } from "@angular/core";
import { PostComponent } from "./components/post.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [PostComponent],
    entryComponents: [],
    imports: [CommonModule],
    exports: [PostComponent]
})

export class PostModule {
}