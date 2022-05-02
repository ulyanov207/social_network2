import React, {Component} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Route, Routes} from "react-router";
import UsersContainer from "./components/Users/UsersCotainer";
import LoginPage from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import HeaderContainer from "./components/Header/HeaderContainer";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));


class App extends Component {
    catchAllUnhandledErrors = (reason, promise) => {
        alert("Some error occurred")
        //console.error(promiseRejectionEvent)
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
        //handle error here, for example log
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }


    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                            <Route path='/profile/:userId/' element={<ProfileContainer/>}/>
                            <Route path='/users/*' element={<UsersContainer/>}/>
                            <Route path='/login/*' element={<LoginPage/>}/>
                            <Route path='*' element={<div>404 NOT FOUND</div>}/>
                        </React.Suspense>
                    </Routes>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose
connect(mapStateToProps, {initializeApp})(App);
