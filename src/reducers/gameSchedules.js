const gameSchedulesDefaultState = {
    gameSchedules:[]
};

export default (state = gameSchedulesDefaultState, action) => {
    console.log('new schedules:', action.data);
    switch (action.type) {
        case 'SET_GAME_SCHEDULES':
            return {
                gameSchedules: action.data
            }
        default:
            return state;
    }
};
