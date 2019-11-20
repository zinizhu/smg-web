import React from 'react';

import {Row, Col, Card} from 'react-bootstrap';

export class GameScheduleNavCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { gameId, guestTeam, score, guestScore, location, gameDate, dateObject } = this.props.game;
        //const dateString = gameDate[0] + '/' + gameDate[1] + '/' + gameDate[2];

        const dateString = dateObject.getFullYear() + '/' + (dateObject.getMonth()+1) + '/' + dateObject.getDate();
        const minute = dateObject.getMinutes();
        const hour = dateObject.getHours();
        const updatedMinute = minute < 10 ? '0' + minute : minute;
        const updatedHour = hour < 10 ? '0' + hour : hour;
        const time = updatedHour + ':' + updatedMinute;
        return (
          <div style={{ margin: '10px 10px' }}>
          <Card className='text-center' >
            <Card.Header>Schedule</Card.Header>
            <Row>
              <Col xs={3} className="text-center">SMG</Col>
              <Col xs={6}>
                <Card.Body>
                  <Card.Text>
                    <small>{dateString}</small>
                  </Card.Text>
                  <Card.Text>
                    <small>{time}</small>
                  </Card.Text>
                  <Card.Text>
                    <small>{score} - {guestScore}</small>
                  </Card.Text>
                </Card.Body>
              </Col>
              <Col xs={3}>
                <span className="align-middle">{guestTeam}</span>
              </Col>
            </Row>
          </Card>
          </div>
        );
    }
}

