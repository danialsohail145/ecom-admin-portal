import { Component, OnInit } from '@angular/core';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;

  constructor(private authService: AuthService) { }



  ngOnInit(): void {
  }

  loginUser(){
    this.authService.SignIn(this.username,this.password)
  }

}
