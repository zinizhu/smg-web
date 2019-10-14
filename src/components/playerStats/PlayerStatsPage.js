import React from 'react';


export class PlayerStatsPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const playerId = this.props.match.params.id;
        console.log('props:', this.props);

        return (
            <div>
                <p>Here is player detailed stats</p>
                <p>player id: {playerId}</p>
            </div>

        );
    }
}

// const mapStateToProps = (state, props) => {
//     return {
//         gameSchedules: state.gameSchedules.gameSchedules
//     }
// }
   
// export default connect(mapStateToProps)(GameScheduleCard);