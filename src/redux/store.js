import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "Hi,how are you?", likesCount: 3},
                {id: 2, message: "It's my first post", likesCount: 38},
                {id: 3, message: "Is my love ", likesCount: 17},
                {id: 4, message: "Yes", likesCount: 15}
            ],
            newPostText: 'it-kamasutra.com'
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Evgeniy'},
                {id: 2, name: 'Sveta'},
                {id: 3, name: 'Victor'},
                {id: 4, name: 'Nataly'},
                {id: 5, name: 'Sergeiy'}
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'Like you'},
                {id: 3, message: 'Yo'},
                {id: 4, message: 'Yo'},
                {id: 5, message: 'Yo'}
            ],
            newMessageBody: ""
        },
        sidebar: {}
    },
    _callSubscriber() {
        console.log('State changed')
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    }
}

export default store;
window.store = store;