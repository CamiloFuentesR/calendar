import Swal from "sweetalert2";
import clienteAxios, { clienteAxiosToken } from "../config/axios"
import { types } from "../types/types"

export const startLogin = (value) => {
    return async (dispatch) => {

        await clienteAxios.post('/auth', value)
            .then(({data}) => {
                console.log(data)
                localStorage.setItem('token', data.token);
                localStorage.setItem('token-init-date', new Date().getTime());
                
                dispatch(login({
                    uid:data.uid,
                    name: data.name
                }));
            })
            .catch(({response:{data:{msg}}}) => {
                
                Swal.fire('Error',msg,'error');
            });

        //  const resp = await fetchSinToken('auth',value,'POST')
        //  const body = await resp.json();
        //  console.log(resp) 
    }
}

export const startRegister = ({rName:name,rEmail: email,rPassword1:password}) => {
    return async (dispatch) => {
        await clienteAxios.post('/auth/new', {name,email,password})
            .then(({data}) => {
                console.log(data)
                localStorage.setItem('token', data.token);
                localStorage.setItem('token-init-date', new Date().getTime());
                
                dispatch(login({
                    uid:data.uid,
                    name: data.name
                }));
            })
            .catch(({response:{data:{msg}}}) => {
                
                Swal.fire('Error',msg,'error');
            });
    }
}

export const startChecking = () => {
    return async (dispatch) => {
        await clienteAxiosToken.get('/auth/renew')
            .then(({data}) => {
                console.log(data)
                localStorage.setItem('token', data.token);
                localStorage.setItem('token-init-date', new Date().getTime());
                
                dispatch(login({
                    uid:data.uid,
                    name: data.name
                }));
            })
            .catch(({response:{data:{msg}}}) => {
                
                Swal.fire('Error',msg,'error');
                dispatch(checkingFinish());
            });
    }

}


const checkingFinish = () => ({
    type: types.authCheckingFinish
});


const login = (value) => ({
    type: types.authLogin,
    payload: value
});