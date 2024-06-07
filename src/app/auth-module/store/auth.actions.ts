import { createAction, props } from "@ngrx/store";
import { LoginCredentials } from "../models/auth";

// Actions for auth module
export const loginRequest = createAction("loginRequest", props<{ credentials: LoginCredentials }>());
export const loginSuccess = createAction("loginSuccess", props<any>());
export const loginFailure = createAction("loginFailure", props<any>());