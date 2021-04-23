import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { startLogout} from '../../actions/authActions'
import {eventLogout} from '../../actions/eventActions'
export const NavBar = () => {
    const {name} = useSelector(state => state.root.auth)
    const dispatch = useDispatch();
     
    const handleLogout = () => {
        dispatch(eventLogout())
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
