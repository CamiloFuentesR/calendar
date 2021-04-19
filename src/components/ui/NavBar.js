import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { startLogout} from '../../actions/authActions'
export const NavBar = () => {
    const {name} = useSelector(state => state.root.auth)
    const dispatch = useDispatch();
     
    const handleLogout = () => {
        localStorage.setItem('token','');
        localStorage.setItem('token-init-date','') 
         dispatch(startLogout())
    }

    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                {name}
            </span>
            <button 
                type="submit"
                className="btn btn-outline-danger"
                onClick={handleLogout}
            >
                <i className="fas fa-sign-out-alt"></i>
                <span> salir</span>
            </button>
        </div>
    )
}
