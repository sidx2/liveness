import { createFeatureSelector, createSelector } from "@ngrx/store";

export const kiosSettingsFeatureSelector = createFeatureSelector<any>("kioskSettings");

export const kiosSettingsStateSelector = createSelector(
    kiosSettingsFeatureSelector,
    (state) => state,
)