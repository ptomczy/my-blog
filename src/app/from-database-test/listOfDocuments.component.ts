import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { DatabaseService } from './listOfDocuments.service';



@Component({
  selector: 'list-of-documents',
  templateUrl: 'listOfDocuments.component.html',
  styles: []
})

export class Documents implements OnInit {
    postes;

  constructor(private dbService: DatabaseService) {
   }

  ngOnInit() {
    // this.postes = this.dbService.getPostes('posty').subscribe(x => {
    //   console.log('Przychodzące dane: ' + x);
    //   return x;
    // });


    this.postes = this.dbService.getPostes('posts');
  }


}