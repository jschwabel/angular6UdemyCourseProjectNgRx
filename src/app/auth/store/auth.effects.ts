import { Effect, Actions } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import * as AuthActions from "./auth.actions";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import 'rxjs/add/observable/of';
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/mergeMap";
import { fromPromise } from "rxjs/observable/fromPromise";
import * as firebase from "firebase";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .map((action: AuthActions.TrySignup)=>{
        return action.payload;//map returns an Observable, so we can chain more
    })
    .switchMap((authData: {username, string, password: string})=>{
        console.log("Effect authSignup authData.username["+authData.username+"]");
        return fromPromise(firebase.auth()
        .createUserWithEmailAndPassword(authData.username, authData.password))
        .switchMap(()=>{
            return fromPromise(firebase.auth().currentUser.getIdToken());
        })
        .mergeMap((token: string)=>{
            this.router.navigate(["/"]);
            return [
                {
                    type: AuthActions.SIGNUP
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                }
            ];
        })
        .catch((e) => {
            console.log("Effect authSignup error", e);
            return Observable.of({ type: AuthActions.SIGNUP_FAILED, payload: e });
        });
    });

    @Effect()
    authSignin = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .map((action: AuthActions.TrySignup)=>{
        //console.log("Effect authSignin 1");
        return action.payload;//map returns an Observable, so we can chain more
    })
    .switchMap((authData: {username, string, password: string})=>{
        console.log("Effect authSignin authData.username["+authData.username+"]");
        return fromPromise(firebase.auth()
        .signInWithEmailAndPassword(authData.username, authData.password))
        .switchMap(()=>{
            //console.log("Effect authSignin 3");
            return fromPromise(firebase.auth().currentUser.getIdToken());
        })
        .mergeMap((token: string)=>{
            //console.log("Effect authSignin 4");
            this.router.navigate(["/"]);
            return [
                {
                    type: AuthActions.SIGNIN
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                }
            ];
        })
    .catch((e) => {
        console.log("Effect authSignin error", e);
        return Observable.of({ type: AuthActions.SIGNIN_FAILED, payload: e });
    })
    });

    @Effect({dispatch: false})
    authLogout = this.actions$
        .ofType(AuthActions.LOGOUT)
        .do(()=>{
            this.router.navigate(['/'])
        });

    constructor(private actions$: Actions, private router: Router) {}
}