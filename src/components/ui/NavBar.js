import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { startLogout} from '../../actions/authActions'
export const NavBar = () => {
    const {name} = useSelector(state => state.root.auth)
    const history = useHistory();
    const dispatch = useDispatch();
    const local = localStorage.getItem('token')
     
    
    /* useEffect(() => {
        history.push('/login');
    }, []) */
 
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
