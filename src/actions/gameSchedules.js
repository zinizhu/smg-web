const axios = require('axios');

export const setGameSchedules = (gameSchedules) => ({
    type: 'SET_GAME_SCHEDULES',
    data: gameSchedules
});

const loadGameSchedules = (dispatch, response) => {
    var gameSchedules = response.data;
    // format date
    gameSchedules.map((schedule) => {
        let gameDateArr = schedule.gameDate.split(/[- T : .]/);
        console.log('Modified Date Arr:', gameDateArr);
        gameDateArr[1]--;

        schedule.gameDate = new Date(...gameDateArr.slice(0,6));
    })

    console.log('Modified schedules:', gameSchedules);
    dispatch(setGameSchedules(gameSchedules));
}

export const fetchGameSchedules = () => (dispatch) => {
    // fetch all game schedules from backend
    console.log('[GameSchedules] fetching game schedules...');
    const date = new Date();
    console.log('date:', date.toISOString());
    axios.get('http://localhost:8080/api/gameSchedule')
        .then((response) => {
            loadGameSchedules(dispatch, response);
        })
};

export const fetchGameSchedulesByGuest = guest => (dispatch) => {
    // fetch all game schedules from backend
    console.log(`[GameSchedules] fetching game schedules with guest team ${guest}...`);
    
};

export const addOrUpdateNewGameSchedule = data => (dispatch) => {
    console.log('New game schedule:', data);
    if (data.gameId !== undefined) {
        // update existing schedule
        axios({
            url:'http://localhost:8080/api/gameSchedule', 
            data: data,
            method: 'put',
            headers: {
                // "Content-Type": "application/x-www-form-urlencoded",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            }
        })
        .then((res) => {
            console.log('Game schedule updated.');
        })
    }
    else {
        // save new schedule
        console.log('in post');
        axios({
            method: 'post',
            data: data,
            url: 'http://localhost:8080/api/gameSchedule'
        })
        .then((res) => {
            console.log('New game schedule submitted.');
        });
    }
    
};

export const deleteGameScheduleById = gameId => dispatch => {
    axios.delete(`http://localhost:8080/api/gameSchedule/${gameId}`)
        .then((res) => {
            loadGameSchedules(dispatch, res);
        })
        .catch((e) => {
            console.log('Cannot delete game schedule with id: ', gameId);
            console.log(e);
        });
};