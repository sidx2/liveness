import { createReducer, on } from "@ngrx/store";
import { createAssignmentSuccess, createUserFailure, createUserRequest, createUserSuccess, deleteAssignmentSuccess, deleteUserSuccess, fetchAssignmentSuccess, fetchUsersSuccess, updateAssignmentSuccess, updateUserSuccess } from "./kiosk-settings.actions";

export const initialState = {
    users: [],
    assignments: [],
}
export const kioskSettingsReducer = createReducer(
    initialState,
    on(createUserRequest, (state) => {
        return state;
    }),
    on(createUserSuccess, (state, action) => {
        console.log("action: ", action)
        return ({...state, users: [...state.users, action.user]});
    }),
    on(createUserFailure, (state) => {
        return state;
    }),

    on(fetchUsersSuccess, (state, action) => {
        return ({...state, users: action.users})
    }),

    on(deleteUserSuccess, (state, action) => {
        return ({...state, users: [...state.users.filter((u) => u._id.$oid != action._id)]})
    }),

    on(updateUserSuccess, (state, action) => {
        const newUsers = state.users.map((u) => {
            console.log("u: ", u, "action.user: ", action.user);
            if (u._id.$oid == action.user.id) {
                return {...action.user, _id: u._id};
            }
            return u
        });

        return ({...state, users: newUsers});
    }),

    // assignments

    on(createAssignmentSuccess, (state, action) => {
        console.log("action: ", action)
        return ({...state, assignments: [...state.assignments, action.assignment]});
    }),
    on(fetchAssignmentSuccess, (state, action) => {
        console.log("state: ", state, "actions: ", action);
        return ({...state, assignments: action.assignments })
    }),

    on(updateAssignmentSuccess, (state, action) => {
        const newAssignments = state.assignments.map((a) => {
            console.log("a: ", a, "action.user: ", action.assignment);
            if (a._id.$oid == action.assignment._id.$oid) {
                return {...action.assignment, _id: a._id};
            }
            return a
        });

        return ({...state, assignments: newAssignments});
    }),

    on(deleteAssignmentSuccess, (state, action) => {
        return ({...state, assignments: [...state.assignments.filter((a) => a._id.$oid !== action._id)]})
    }),
)