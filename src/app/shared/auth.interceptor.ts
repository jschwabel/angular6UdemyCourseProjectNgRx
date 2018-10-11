import { HttpEvent, HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
// import { AuthService } from "../auth/auth.service";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    // constructor(private authService: AuthService){}
    constructor(private store: Store<fromApp.AppState>) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("intercept", request);
        //const copiedRequest = request.clone({headers: request.headers("","")});
        //const copiedRequest = request.clone({params: request.params.set("auth", this.authService.getToken())});
        //console.log("intercept", copiedRequest);
        //return next.handle(copiedRequest);
        return this.store.select("auth")
            .take(1)
            .switchMap((authState: fromAuth.State)=> {
                const copiedRequest = request.clone({params: request.params.set("auth", authState.token)});
                console.log("intercept", copiedRequest);
                return next.handle(copiedRequest);
        })
    }
}