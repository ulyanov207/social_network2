import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";


    let state = {
        posts: [
            {id: 1, message: "Hi,how are you?", likesCount: 3},
            {id: 2, message: "It's my first post", likesCount: 38},
            {id: 3, message: "Is my love ", likesCount: 17},
            {id: 4, message: "Yes", likesCount: 15}
        ],
    }
test('length of posts should be incremented', () => {
    //1. test data
    let action = addPostActionCreator("it-kamasutra.com")
    //2. action
    let newState = profileReducer(state,action)

    //3.expectation
    expect (newState.posts.length).toBe(5)
});
test('message of new post should be correct', () => {

//1. test data
    let action = addPostActionCreator("it-kamasutra.com")
//2. action
    let newState = profileReducer(state,action)

    //3.expectation
    expect (newState.posts[4].message).toBe("it-kamasutra.com")
});
test('after deleting length of messages should be decrement', () => {

//1. test data
    let action = deletePost(1)
//2. action
    let newState = profileReducer(state,action)

    //3.expectation
     expect (newState.posts.length).toBe(3)
});
test(`after deleting length shouldn't be decrement if id is incorrect`, () => {

//1. test data
    let action = deletePost(1000)
//2. action
    let newState = profileReducer(state,action)

    //3.expectation
     expect (newState.posts.length).toBe(4)
});
