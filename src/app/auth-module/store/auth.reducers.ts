import { createReducer, on } from "@ngrx/store";
// import { resetLoading, setLoading } from "./auth.actions";
import { IAuthState } from "../models/auth";

export const initialState: IAuthState = {
    isLoading: false,
}

export const authReducer = createReducer(
    initialState,

    // on(setLoading, (state) => {
    //     return ({ ...state, isLoading: true });
    // }),
    // on(resetLoading, (state) => {
    //     return ({ ...state, isLoading: false });
    // })
)