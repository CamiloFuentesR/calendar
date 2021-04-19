import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { startChecking } from '../actions/authActions'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'

export const AppRouter = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        
        dispatch(startChecking())
    }, [dispatch])


    return (
            <Router>
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={CalendarScreen}
                    >
                    </Route>
                    <Route
                        exact
                        path="/login"
                        component={LoginScreen}
                    >
                    </Route>
                    
                    <Redirect to="/"/>
                </Switch>
            </Router>
    )
}
