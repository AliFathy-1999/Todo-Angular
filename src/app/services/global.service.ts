import { Injectable } from '@angular/core';
type User = {
  name:string,
  quote:string,
}
type Todo = {
  id:number,
  todo:string,
  completed:boolean,
}
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public isLoggedIn : boolean = false;
  public navbar : boolean = false;
  public footer : boolean = false;

  public user:User = {name:"", quote:""};
  public task:any;
  constructor() {
  }
  isAuthenticated(){
    return this.isLoggedIn;
  }
  getUser(){
    return this.user;
  }
  getId(id:number){
    console.log(id);
  }
}
