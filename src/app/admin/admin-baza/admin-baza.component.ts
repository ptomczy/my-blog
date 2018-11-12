import { Component } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";

const posts = [
    {id: '0', title: 'Tytuł pierwszego posta', content: 'Treść pierwszego posta', tags: [{id: '1', name: 'tag pierwszy'}, {id: '2', name: 'tag drugi'}], creationDate: '2018-03-22 23:34:54'},
    {id: '1', title: 'Tytuł drugiego posta', content: 'Treść drugiego posta', tags: [{id: '2', name: 'tag drugi'}], creationDate: '2017-12-22 10:00:12'},
    {id: '2', title: 'Tytuł trzeciego posta', content: 'Treść trzeciego posta', tags: [{id: '2', name: 'tag drugi'}, {id: '3', name: 'tag trzeci'}], creationDate: '2017-05-22 14:33:21'},
    {id: '3', title: 'Tytuł czwartego posta', content: 'Treść czwartego posta', tags: [{id: '1', name: 'tag pierwszy'}, {id: '3', name: 'tag trzeci'}], creationDate: '2017-03-31 21:45:20'}
];

@Component({
    selector: 'admin-baza',
    templateUrl: './admin-baza.component.html'
})

export class AdminBazaComponent {
    constructor(private db: AngularFireDatabase){

    }

    loadPosts(){
        posts.forEach(x => {
            this.db.list('posts').push(x);
        });
        console.log('Baza postów utworzona');
    }

    deleteAllPosts(){
        this.db.list('posts').remove();
        console.log('Wszystkie posty usunięte z bazy');
    }
}