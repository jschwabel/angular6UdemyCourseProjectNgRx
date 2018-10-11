import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from "../../store/app.reducers";
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from "../store/auth.actions";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginAttempted:boolean=false;
  authState: Observable<fromAuth.State>;
  //constructor(private authService: AuthService) { }
  constructor(private store: Store<fromApp.AppState>){}

  ngOnInit() {
    this.authState = this.store.select("auth");
  }

  onSignIn(form: NgForm){
    //this.authService.signinUser(form.value.email, form.value.password);
    this.store.dispatch(new AuthActions.TrySignin({username: form.value.email, password: form.value.password}));
    this.loginAttempted=true;
    //if(this.authService.isAuthenticated()) { //async
    //this.loginSuccess=true; 
    //}
    console.log("onSignIn email["+form.value.email+"] loginAttempted["+this.loginAttempted+"]");
  }
}
