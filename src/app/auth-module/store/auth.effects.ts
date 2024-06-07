import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { loginFailure, loginRequest, loginSuccess } from "./auth.actions";


@Injectable()
export class authEffects {
    constructor(
        private action$: Actions,
        private authService$: AuthService,
        // private store: Store<{ auth: IAuthState }>,
        // private toastr: ToastrService,
    ) { }

    loginUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(loginRequest),
            // tap(() => { this.store.dispatch(setLoading()); }),
            switchMap(({ credentials }) =>
                this.authService$.login(credentials).pipe(
                    map((res: any) => {
                        // this.store.dispatch(resetLoading());
                        // this.toastr.success("Welcome back!");
                        console.log("res: ", res);
                        return loginSuccess(res);
                    }),
                    catchError((err) => {
                        console.log("err: ", err);
                        // this.store.dispatch(resetLoading());
                        const error = err?.error?.error || "Something went wrong";
                        // this.toastr.error(`Failed to login. ${error}`);
                        return of(loginFailure({ error }))
                    }
                    )
                )
            )
        )
    )
}