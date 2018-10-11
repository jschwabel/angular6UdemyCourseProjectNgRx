import { Action } from "@ngrx/store";

export const TRY_SIGNUP = "TRY_SIGNUP";
export const SIGNUP = "SIGNUP";
export const SIGNUP_FAILED = "SIGNUP_FAILED";
export const TRY_SIGNIN = "TRY_SIGNIN";
export const SIGNIN = "SIGNIN";
export const SIGNIN_FAILED = "SIGNIN_FAILED";
export const LOGOUT = "LOGOUT";
export const SET_TOKEN = "SET_TOKEN";

export class TrySignup implements Action {
    readonly type=TRY_SIGNUP;
    constructor(public payload: {username: string, password: string}){}
}

export class Signup implements Action {
    readonly type=SIGNUP;
}

export class SignupFailed implements Action {
    readonly type=SIGNUP_FAILED;
    constructor(public payload: string){}
}

export class TrySignin implements Action {
    readonly type=TRY_SIGNIN;
    constructor(public payload: {username: string, password: string}){}
}

export class SigninFailed implements Action {
    readonly type=SIGNIN_FAILED;
    constructor(public payload: string){}
}

export class Signin implements Action {
    readonly type=SIGNIN;
}

export class Logout implements Action {
    readonly type=LOGOUT;
}

export class SetToken implements Action {
    readonly type=SET_TOKEN;
    constructor(public payload: string) {}
}

export type AuthActions = Signup | Signin | Logout | SetToken | TrySignup | TrySignin | SignupFailed | SigninFailed;