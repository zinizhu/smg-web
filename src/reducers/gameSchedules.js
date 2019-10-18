const gameSchedulesDefaultState = {
    gameSchedules:[]
};

export default (state = gameSchedulesDefaultState, action) => {
    
    switch (action.type) {
        case 'SET_GAME_SCHEDULES':
            console.log('in reducer: new schedules:', action.data);
            return {
                gameSchedules: action.data
            }
        default:
            return state;
    }
};
