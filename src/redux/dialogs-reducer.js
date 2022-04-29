const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {

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
    ]
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            };
        default:
            return state;
    }
}

export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody})


export default dialogsReducer;