const authenticationDefaultState = {
    userId:'',
    jwtToken:''
};

export default (state = gameSchedulesDefaultState, action) => {
    
    switch (action.type) {
        case 'SET_AUTH':
            console.log('in reducer: set authentication', action.data);
            return {
                userId: action.data.userId,
                jwtToken: action.data.jwtToken
            }
        default:
            return state;
    }
};
