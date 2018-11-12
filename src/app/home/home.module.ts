import { NgModule } from "@angular/core";
import { Store } from "@ngrx/store";
import { IAppStateWithHome, appWithHomeReducer } from "./reducer";
import { MultiAnswerComponent } from "./multi-answer/ma.component";
import { CommonModule } from "@angular/common";


@NgModule({
    declarations: [MultiAnswerComponent],
    imports: [CommonModule],
    exports: [MultiAnswerComponent],
    entryComponents: []
})

export class HomeModule {
    constructor(private store: Store<IAppStateWithHome>){
        store.addReducer("home (taki testowy)", appWithHomeReducer);
    }
}