import axios from "axios";


//aqui no se necesita un dotenv?
const clienteAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

/* const clienteAxios = new Promise((resolve,reject)=>{
    resolve(
        axios.create({
            baseURL: process.env.REACT_APP_API_URL,
        })

    )
    reject('no hay conexion')
})

console.log(clienteAxios) */

const token = localStorage.getItem('token') || '';

export const clienteAxiosToken = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'x-token': token
    }
}); 


export default clienteAxios;


