import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types';


export const PublicRouter = ({
    isAuthenticated,
    isLogged,
    component: Component,
    ...rest
}) => {

   
    return (
        <Route {...rest}
            component={(props) => (

                (!isAuthenticated && !isLogged)
                    ? (<Component {...props} />)
                    : (<Redirect to="/" />)
            )}
        />
    )
}
PublicRouter.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}