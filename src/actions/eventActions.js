import { types } from "../types/types";


export const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const cleanActiveNote = () => ({
    type: types.cleanActiveNote,
    
});

export const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventDeleted = (id) => ({
    type: types.eventDeleted,
    payload: id
});