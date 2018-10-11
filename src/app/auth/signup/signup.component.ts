import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
// import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from "../../store/app.reducers";
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from "../store/auth.actions";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupAttempted: boolean = false;
  authState: Observable<fromAuth.State>;
  //constructor(private authService: AuthService) { }
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authState = this.store.select("auth");
  }

  onSignUp(form: NgForm){
    this.signupAttempted=false;
    const email = form.value.email;
    const password = form.value.password;
    //this.authService.signupUser(email, password);
    this.store.dispatch(new AuthActions.TrySignup({username: email, password: password}));
    this.signupAttempted=true;
    console.log("onSignup email["+email+"] signupAttempted["+this.signupAttempted+"]");
  }
}
