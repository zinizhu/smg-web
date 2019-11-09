const authenticationDefaultState = {
    success: false,
    userId:'',
    username: '',
    jwtToken:''
};

export default (state = authenticationDefaultState, action) => {
    console.log('[Authentication] In reducer', action.type);
    switch (action.type) {
        case 'SET_AUTH':
            console.log('in reducer: set authentication', action.data);
            return {
                success: true,
                userId: action.data.userId,
                username: action.data.username,
                jwtToken: action.data.jwtToken
            }
        default:
            return state;
    }
};
