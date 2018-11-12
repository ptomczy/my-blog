import { NgModule } from "@angular/core";
import { AdminPage } from "./admin";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { AdminBazaComponent } from "./admin-baza/admin-baza.component";

@NgModule({
    declarations:[
        AdminPage,
        AdminBazaComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        AdminPage,
        AdminBazaComponent
    ],
    entryComponents: []
})
export class AdminModule {
}