import { types } from "../types/types";



export const uiOpenModal = () => ({
    type: types.uiOpenModal,
    payload: true
})

export const uiCloseModal = () => ({
    type: types.uiCloseModal,
    payload: false
})

export const uiOpenSuccesM = () => ({
    type: types.uiOpenSuccesM,
    payload: true
})
export const uiCloseSuccesM = () => ({
    type: types.uiCloseSuccesM,
    payload: false
})

export const startLoading = () => ({
    type: types.startLoading,
    payload: true
})
export const endLoading = () => ({
    type: types.endLoading,
    payload: false
})