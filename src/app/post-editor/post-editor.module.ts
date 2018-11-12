import { NgModule } from "@angular/core";
import { PostEditorComponent } from "./post-editor";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [PostEditorComponent],
    imports: [CommonModule, ReactiveFormsModule],
    exports: [PostEditorComponent]
})

export class PostEditorModule {

}