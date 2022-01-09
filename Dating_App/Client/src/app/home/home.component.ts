import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //users: any;
  registerMode = false;
  baseUrl = 'https://localhost:44341/api/';


  constructor() { }

  ngOnInit(): void {
    //this.getUsers();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  //getUsers() {
  //  this.http.get(this.baseUrl + 'users').subscribe(users =>
  //    this.users = users
  //  )
  //}

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

}
