import React from 'react';
import {Navigate} from "react-router";
import connect from "react-redux/lib/connect/connect";

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
})

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Navigate to="/login"/>

            return <Component{...this.props}/>

        }
    }

   let  ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)


    return ConnectedAuthRedirectComponent

}