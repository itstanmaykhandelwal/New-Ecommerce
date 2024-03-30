import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({component:Component, ...rest}) => {
    const {isAuthenticated} = useSelector((state) => state.user);
    return (
        <div>
            <Route
                {...rest}
                render={(props) =>{
                    if(isAuthenticated === false){
                        return <Redirect to="/login"/>
                    }
                    return <Component {...props}/>
                }}
            />
        </div>
    )
}

export default ProtectedRoute