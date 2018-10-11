import * as AuthActions from "./auth.actions";
export interface State {
    token: string;
    authenticated: boolean;
    errorMessage?: string;
}
const initialState: State = { 
    token: null,
    authenticated: false
};

export function authReducer(state=initialState, action: AuthActions.AuthActions){
    console.log("authReducer action.type["+action.type+"]");
    switch(action.type) {
        case AuthActions.SIGNUP:
        case AuthActions.SIGNIN:
            return {
                ...state, authenticated: true
            };
        case AuthActions.LOGOUT:  
            return {
                ...state,
                token: null,
                authenticated: false
            }
        case (AuthActions.SET_TOKEN):
            return {
                ...state,
                token: action.payload
            }  
        case (AuthActions.SIGNUP_FAILED): 
        case (AuthActions.SIGNIN_FAILED):
        console.log("authReducer action.payload["+action.payload+"]");
            return {
                ...state,
                token: null,
                errorMessage: action.payload
            }   
        default: return state;
    }
}
    