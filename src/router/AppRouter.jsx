import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { startChecking } from '../actions/authActions'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'
// import Cargando from '../components/ui/Cargando'
// import { Loading } from '../components/ui/Loading'
import { PrivateRouter } from './PrivateRouter'
import { PublicRouter } from './PublicRouter'

export const AppRouter = () => {

    const dispatch = useDispatch();
    const {/* checking, */uid} = useSelector(state => state.root.auth);
    useEffect(() => {
        
        dispatch(startChecking())
    }, [dispatch])
    
    /* if( checking ||  loading){
        return <Cargando/>
    } */

    return (
            <Router>
                <>
                <Switch>
                    <PrivateRouter
                        exact
                        path="/"
                        component={CalendarScreen}
                        isAuthenticated={!!uid}
                    />
                    <PublicRouter
                        exact
                        path="/login"
                        component={LoginScreen}
                        isAuthenticated={!!uid}
                    />
                    <Redirect to="/"/>
                </Switch>
                </>
            </Router>
    )
}
