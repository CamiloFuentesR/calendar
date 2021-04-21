import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/authActions';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    
    const [ formLoginValues, handleLoginInputChange ] = useForm( {
        email: 'camilo@gmail.com',
        password: 'Camilo1#'
    } );
    const [ formRegisterValues, handleRegisterInputChange ] = useForm( {
        rName: 'Camilo2',
        rEmail: 'camilo2@gmail.com',
        rPassword1: 'Camilo1#',
        rPassword2: 'Camilo1#'
    } );

    const {rName,rEmail,rPassword1,rPassword2} = formRegisterValues;

    const {email,password} = formLoginValues;

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        dispatch(startLogin(formLoginValues));

    } 
    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        console.log(formRegisterValues)
        if(rPassword1 !== rPassword2){
            return Swal.fire('Error','Las contraaseñas deben ser iguales','error')
        }

         dispatch(startRegister(formRegisterValues));

    } 

    return (
        <div className="container login-container animate__animated animate__fadeIn">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="email"
                                value={email}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="password"
                                value={password}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                value={rName}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="rEmail"
                                value={rEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="rPassword1" 
                                value={rPassword1}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="rPassword2"
                                value={rPassword2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}