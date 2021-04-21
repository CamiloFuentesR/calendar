import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types';
import {Loading} from '../components/ui/Loading'
import { useSelector } from 'react-redux';


export const PrivateRouter = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    const {checking} = useSelector(state => state.root.auth);

    if( checking){
        return <Loading/>
    }
    return (
        <Route {...rest}
            component={(props) => (

                (isAuthenticated)
                    ? (<Component {...props} />)
                    : (<Redirect to="/login" />)
            )}
        />
    )
}

PrivateRouter.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}