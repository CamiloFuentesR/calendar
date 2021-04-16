import { types } from "../types/types";



export const uiOpenModal = () => ({
    type: types.uiOpenModal,
    payload: true
})

export const uiCloseModal = () => ({
    type: types.uiCloseModal,
    payload: false
})