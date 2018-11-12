import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AngularFireDatabase } from "angularfire2/database";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class DatabaseService {
    constructor(private http: HttpClient, private db: AngularFireDatabase){}

    getPostesHTTP(){
        return this.http.get('https://pt-test-1-36a9b.firebaseio.com/data.json');
      }

    getPostes(listPath): Observable<any[]>{
    //this.db.list(listPath).push({id: 5, dupa: 5});
    //this.db.list(listPath).remove();
    return this.db.list(listPath).valueChanges();
    }
}