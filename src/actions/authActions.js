import Swal from "sweetalert2";
import clienteAxios, { clienteAxiosToken, token } from "../config/axios"
import { types } from "../types/types"
import { endLoading, startLoading } from "./uiActions";

export const startLogin = (value) => {
    return async (dispatch) => {
        dispatch(startLoading())
        await clienteAxios.post('/auth', value)
            .then(({ data }) => {

                localStorage.setItem('token', data.token);
                localStorage.setItem('token-init-date', new Date().getTime());
                dispatch(login({
                    uid: data.uid,
                    name: data.name
                }));
                dispatch(endLoading());
            })
            .catch(({ response: { data: { msg } } }) => {
                Swal.fire('Error', msg, 'error');
            });
        //  const resp = await fetchSinToken('auth',value,'POST')
        //  const body = await resp.json();
        //  console.log(resp) 
    }
}

export const startRegister = ({ rName: name, rEmail: email, rPassword1: password }) => {
    return async (dispatch) => {
        await clienteAxios.post('/auth/new', { name, email, password })
            .then(({ data }) => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('token-init-date', new Date().getTime());
                dispatch(login({
                    uid: data.uid,
                    name: data.name
                }));
            })
            .catch(({ response: { data: { msg } } }) => {

                Swal.fire('Error', msg, 'error');
            });
    }
}

export const startChecking = () => {
    return async (dispatch) => {
        const isCurrentToken = !!token() || '';
        if (!isCurrentToken) {
            dispatch(checkingFinish());
            return;
        }

        await clienteAxiosToken.get('/auth/renew')
            .then(({ data }) => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('token-init-date', new Date().getTime());

                dispatch(login({
                    uid: data.uid,
                    name: data.name
                }));
            })
            .catch(({ response: { data: { msg } } }) => {
                dispatch(checkingFinish());
            });
    }

}


export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(logout())
    }
}

const logout = () => ({
    type: types.authLogout
})

const checkingFinish = () => ({
    type: types.authCheckingFinish
});


const login = (value) => ({
    type: types.authLogin,
    payload: value
});

