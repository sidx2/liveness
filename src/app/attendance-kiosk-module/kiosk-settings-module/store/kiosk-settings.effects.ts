import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { KioskSettingsService } from "../services/kiosk-settings.service"
import {
    createUserRequest,
    createUserSuccess,
    createUserFailure,
    fetchUsersRequest,
    fetchUsersSuccess,
    fetchUsersFailure,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFailure,
    updateUserRequest,
    updateUserSuccess,
    updateUserFailure,
    createAssignmentFailure,
    createAssignmentRequest,
    createAssignmentSuccess,
    fetchAssignmentRequest,
    fetchAssignmentSuccess,
    fetchAssignmentFailure,
    updateAssignmentRequest,
    updateAssignmentSuccess,
    updateAssignmentFailure,
    deleteAssignmentRequest,
    deleteAssignmentFailure,
    deleteAssignmentSuccess
} from "./kiosk-settings.actions"

@Injectable()
export class kioskSettingsEffects {
    constructor(
        private action$: Actions,
        private kioskSettingsService$: KioskSettingsService,
    ) { }

    fetchUsers$ = createEffect(() =>
        this.action$.pipe(
            ofType(fetchUsersRequest),
            switchMap(() =>
                this.kioskSettingsService$.fetchUsers().pipe(
                    map((res: any) => {
                        console.log("res: ", res)
                        return fetchUsersSuccess({ users: res.data });
                    }),
                    catchError((err) => {
                        console.log("err: ", err);
                        const error = err?.error?.error || "Something went wrong";
                        return of(fetchUsersFailure({ error }))
                    }
                    )
                )
            )
        )
    )

    createUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(createUserRequest),
            switchMap(({ user }) =>
                this.kioskSettingsService$.addUesr(user).pipe(
                    map((res: any) => {
                        console.log("userData in effect: ", user);
                        console.log("res: ", res)
                        return createUserSuccess({ user: res.user });
                    }),
                    catchError((err) => {
                        console.log("userData in effect: ", user);
                        console.log("err: ", err);
                        const error = err?.error?.error || "Something went wrong";
                        return of(createUserFailure({ error }))
                    }
                    )
                )
            )
        )
    )

    deleteUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(deleteUserRequest),
            switchMap(({ _id }) =>
                this.kioskSettingsService$.deleteUser(_id).pipe(
                    map((res: any) => {
                        console.log("res: ", res)
                        return deleteUserSuccess({ _id: _id });
                    }),
                    catchError((err) => {
                        console.log("err: ", err);
                        const error = err?.error?.error || "Something went wrong";
                        return of(deleteUserFailure({ error }))
                    }
                    )
                )
            )
        )
    )

    updateUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(updateUserRequest),
            switchMap(({ user }) =>
                this.kioskSettingsService$.updateUser(user).pipe(
                    map((res: any) => {
                        console.log("res: ", res)
                        return updateUserSuccess({ user });
                    }),
                    catchError((err) => {
                        console.log("err: ", err);
                        const error = err?.error?.error || "Something went wrong";
                        return of(updateUserFailure({ error }))
                    }
                    )
                )
            )
        )
    )

    createUserAssignment$ = createEffect(() =>
        this.action$.pipe(
            ofType(createAssignmentRequest),
            switchMap(({ assignment }) =>
                this.kioskSettingsService$.addAssignment(assignment).pipe(
                    map((res: any) => {
                        console.log("res: ", res)
                        return createAssignmentSuccess({ assignment: res.ua });
                    }),
                    catchError((err) => {
                        console.log("err: ", err);
                        const error = err?.error?.error || "Something went wrong";
                        return of(createAssignmentFailure({ error }))
                    }
                    )
                )
            )
        )
    )

    fetchUserAssignment$ = createEffect(() =>
        this.action$.pipe(
            ofType(fetchAssignmentRequest),
            switchMap(() =>
                this.kioskSettingsService$.fetchAssignment().pipe(
                    map((res: any) => {
                        console.log("res: ", res)
                        return fetchAssignmentSuccess({ assignments: res.assignments });
                    }),
                    catchError((err) => {
                        console.log("err: ", err);
                        const error = err?.error?.error || "Something went wrong";
                        return of(fetchAssignmentFailure({ error }))
                    }
                    )
                )
            )
        )
    )

    updateUserAssignment$ = createEffect(() =>
        this.action$.pipe(
            ofType(updateAssignmentRequest),
            switchMap(({ assignment }) =>
                this.kioskSettingsService$.updateAssignment(assignment).pipe(
                    map((res: any) => {
                        console.log("res: ", res)
                        return updateAssignmentSuccess({ assignment: res.ua });
                    }),
                    catchError((err) => {
                        console.log("err: ", err);
                        const error = err?.error?.error || "Something went wrong";
                        return of(updateAssignmentFailure({ error }))
                    }
                    )
                )
            )
        )
    )

    deleteUserAssignment$ = createEffect(() =>
        this.action$.pipe(
            ofType(deleteAssignmentRequest),
            switchMap(({ _id }) =>
                this.kioskSettingsService$.deleteAssignment(_id).pipe(
                    map((res: any) => {
                        console.log("res: ", res);
                        return deleteAssignmentSuccess({ _id });
                    }),
                    catchError((err) => {
                        console.log("err: ", err);
                        const error = err?.error?.error || "Something went wrong";
                        return of(deleteAssignmentFailure({ error }))
                    }
                    )
                )
            )
        )
    )
}