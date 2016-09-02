import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    selector: 'my-app',
    template: `
      <div class="container">
      <h1>Angular 2 with Express and Mongoose</h1>
       <form>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="name" [(ngModel)]="model.name" name="name">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="phone" [(ngModel)]="model.phone" name="phone">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="@mail" [(ngModel)]="model.email" name="email">
        </div>
      <button class="btn btn-default" (click)="addContact(model)">Add</button>
      </form>
       <hr>
       <table class="table">
          <tr *ngFor="let contact of contacts">
             <td>{{contact.name}}</td>
             <td>{{contact.phone}}</td>
             <td>{{contact.email}}</td>
          </tr>
       </table>
      </div>
    `
})
export class AppComponent { 

name:any;
phone:any;
email:any;
model:any;
contacts:[];
private options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' }) });

   constructor(private http: Http){
     this.model={
       name:'',
       phone:'',
       email:''
     };
   }

   ngOnInit(){
      console.log('component initialized ...');
      this.loadContacts();
   }

   loadContacts() {
    this.http.get("/contacts").map(res => res.json()).subscribe(
      data => this.contacts = data
    );
  }

   addContact(model:any){
     console.log(this.model);
     this.http.post('/contact', JSON.stringify(this.model), this.options).subscribe(res => this.contacts.push(res.json()));
   }
}
