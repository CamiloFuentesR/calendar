import { types } from "../types/types";

const initialState = {
    modalOpen: false,
    successMessage: false,
    loading: false

}

export const uiReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.uiOpenModal:
            return{
                ...state,
                modalOpen: action.payload
            }
        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: action.payload
            }
        case types.uiOpenSuccesM:
            return{
                ...state,
                successMessage:true
            }
        case types.uiCloseSuccesM:
            return{
                ...state,
                successMessage:false
            }
        case types.startLoading:
            return {
                ...state,
                loading: action.payload
            }
        case types.endLoading:
            return {
                ...state,
                loading: action.payload
            }
        
        
        default:
            return state;
    }

}