import React from 'react';
import Profile from "./Profile";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import connect from "react-redux/lib/connect/connect";
import {useMatch} from "react-router";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId =this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
     this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId != prevProps.match.params.userId)
            this.refreshProfile()
    }

    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}/>
        );
    }
};

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status:state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

const ProfileURLMatch = (props) => {
    const match = useMatch('/profile/:userId/')
    return <ProfileContainer {...props}
                            match={match}/>
}

let AuthRedirectComponent = withAuthRedirect(ProfileURLMatch)

export default compose (
withAuthRedirect,
    connect(mapStateToProps,{getUserProfile,ProfileURLMatch,getStatus, updateStatus, savePhoto, saveProfile})
)(ProfileContainer)

// export default connect(mapStateToProps, {getUserProfile,ProfileURLMatch})(AuthRedirectComponent);
