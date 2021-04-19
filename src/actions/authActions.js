import Swal from "sweetalert2";
import clienteAxios, { clienteAxiosToken } from "../config/axios"
import { types } from "../types/types"

export const startLogin = (value) => {
    return async (dispatch) => {
        // const res = await clienteAxios.post('/auth', value).catch(e=>console.log(e.request));
      /*   console.log(res)
        if(!! res) {
            return ;
        } */
       /*  const res= await clienteAxios.get('/auth').then(res=>console.log(res)).catch(error => {
             if(error.response === undefined){
                 return console.log('error de conexion')
             }
         });
            if(!res){
                return Swal.fire('Error','Error de conexion con la API','error');
            } */
            await clienteAxios.post('/auth', value)
                .then(({data}) => {
                   
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
        const isCurrentToken = !!(localStorage.getItem('token') || '');

        if (!isCurrentToken){
            dispatch(checkingFinish()); 
            return;
        }

        await clienteAxiosToken.get('/auth/renew')
            .then(({data}) => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('token-init-date', new Date().getTime());
                
                dispatch(login({
                    uid:data.uid,
                    name: data.name
                }));
            })
            .catch(({response:{data:{msg}}}) => {
                dispatch(checkingFinish());
            });
    }

}


export const startLogout = () => {
    return(dispatch) => {
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