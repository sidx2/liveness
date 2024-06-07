import { createAction, props } from "@ngrx/store";

export const fetchUsersRequest = createAction("fetchUsersRequest", props<any>());
export const fetchUsersSuccess = createAction("fetchUsersSuccess", props<any>());
export const fetchUsersFailure = createAction("fetchUsersFailure", props<any>());

export const createUserRequest = createAction("createUserRequest", props<any>());
export const createUserSuccess = createAction("createUserSuccess", props<any>());
export const createUserFailure = createAction("createUserFailure", props<any>());

export const deleteUserRequest = createAction("deleteUserRequest", props<any>());
export const deleteUserSuccess = createAction("deleteUserSuccess", props<any>());
export const deleteUserFailure = createAction("deleteUserFailure", props<any>());

export const updateUserRequest = createAction("updateUserRequest", props<any>());
export const updateUserSuccess = createAction("updateUserSuccess", props<any>());
export const updateUserFailure = createAction("updateUserFailure", props<any>());

export const createAssignmentRequest = createAction("createAssignmentRequest", props<any>());
export const createAssignmentSuccess = createAction("createAssignmentSuccess", props<any>());
export const createAssignmentFailure = createAction("createAssignmentFailure", props<any>());

export const fetchAssignmentRequest = createAction("fetchAssignmentRequest");
export const fetchAssignmentSuccess = createAction("fetchAssignmentSuccess", props<any>());
export const fetchAssignmentFailure = createAction("fetchAssignmentFailure", props<any>());

export const updateAssignmentRequest = createAction("updateAssignmentRequest", props<any>());
export const updateAssignmentSuccess = createAction("updateAssignmentSuccess", props<any>());
export const updateAssignmentFailure = createAction("updateAssignmentFailure", props<any>());

export const deleteAssignmentRequest = createAction("deleteAssignmentRequest", props<any>());
export const deleteAssignmentSuccess = createAction("deleteAssignmentSuccess", props<any>());
export const deleteAssignmentFailure = createAction("deleteAssignmentFailure", props<any>());