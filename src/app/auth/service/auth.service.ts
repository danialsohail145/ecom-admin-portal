import { Injectable } from "@angular/core";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToasterService } from "app/config/toaster.service";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private toast: ToasterService,
    private router: Router
  ) {}

  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        // this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user: any) => {
          if (user) {
          
            localStorage.setItem('token',user.multiFactor.user.accessToken)
            this.toast.success("Login successfully");
            this.router.navigate(['dashboard']);


          }
        });
      })
      .catch((error) => {
        this.toast.error("User cannot login")
        // window.alert(error.message);

      });
  }

  get isLoggedIn(){
    if(!!localStorage.getItem("token")){
      return true;
    }
    return false;
  }
}
