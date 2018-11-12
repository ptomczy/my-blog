import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePage } from '../home/home';
import { AdminPage } from '../admin/admin';
import { AdminModule } from '../admin/admin.module';
import { SharedModule } from '../shared/shared.module';
import { PostEditorComponent } from '../post-editor/post-editor';
import { OrderByDatePipe } from '../shared/pipes/sort-by-date.pipe';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HomeModule } from '../home/home.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { environment } from '../../environments/environment';
import { Documents } from '../from-database-test/listOfDocuments.component';
import { PostEditorModule } from '../post-editor/post-editor.module';
import { FormsModule } from '@angular/forms';
import { Store } from "@ngrx/store";
import { IAppStateWithApp, appWithAppReducer } from "../app/reducer";
import { AdminBazaComponent } from '../admin/admin-baza/admin-baza.component';
import { PostsResolve } from '../shared/services/post-resolver.service';
import { HttpModule } from '@angular/http';
import { DatabaseService } from '../from-database-test/listOfDocuments.service';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: '', 
    component: HomePage,
    resolve: { posts: PostsResolve}
  },
  { path: 'posts', 
    component: HomePage,
    resolve: { posts: PostsResolve}
  },
  { path: 'admin', component: AdminPage},
  { path: 'admin/postEditor/:mode', component: PostEditorComponent},
  { path: 'baza', component: AdminBazaComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    OrderByDatePipe,
    Documents
  ],
  imports: [
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 50
    }),
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    SharedModule,
    AdminModule,
    HomeModule,
    PostEditorModule,
    HttpModule,
    HttpClientModule,


    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [AngularFireDatabase, PostsResolve, DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private store: Store<IAppStateWithApp>) {
    store.addReducer("app", appWithAppReducer);
 }
}
