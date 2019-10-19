import React from 'react';

import {Row, Col, Card} from 'react-bootstrap';

export class GameScheduleNavCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { gameId, guestTeam, score, guestScore, location, gameDate } = this.props.game;
        const dateString = gameDate[0] + '/' + gameDate[1] + '/' + gameDate[2];
        return (
            <div style={{ margin: '10px 10px' }}>
        <Card className='text-center' style={{ width: '18rem'}}>
          <Card.Header>Schedule</Card.Header>
          <Row>
          <Col xs={3}>SMG</Col>
          <Col xs={6}>
            <Card.Body>
              <Card.Title>{dateString}</Card.Title>
              <Card.Text>
                {score} - {guestScore}
              </Card.Text>
              <Card.Text>
                <small>{location}</small>
              </Card.Text>
            </Card.Body>
          </Col>
          <Col xs={3}>{guestTeam}</Col>
          </Row>
        </Card>
      </div>
        );
    }
}

// <div style={{borderStyle:" solid", borderRadius:"3px",  display:"block", margin:"20px auto", padding:"20px"}}>
// <Row>
//     <Col xs={3} style={{margin:"10px auto"}}>
//         <Row style={{display:"block", margin: "0 auto", textAlign:"center"}}>SMG</Row>
//     </Col>
//     <Col xs={6} style={{margin:"10px auto"}}>
//         <Row style={{display:"block", margin: "0 auto", textAlign:"center"}}>{dateString}</Row>
//         <Row style={{display:"block", margin: "0 auto", textAlign:"center"}}>{score} - {guestScore}</Row>
//         <Row style={{display:"block", margin: "0 auto", textAlign:"center"}}>{location}</Row>
//     </Col>
//     <Col xs={3} style={{margin:"10px auto"}}>
//         <Row style={{display:"block", margin: "0 auto", textAlign:"center"}}>{guestTeam}</Row>
//     </Col>
// </Row>
// </div>
