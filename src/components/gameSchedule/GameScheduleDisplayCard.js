import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Button, Card } from 'react-bootstrap'

export class GameScheduleDisplayCard extends React.Component {
  constructor (props) {
    super(props)
  }

  onClickEdit = () => {
    const { onClickEdit } = this.props
    onClickEdit()
  }

  onClickDelete = () => {
    const { onClickDelete } = this.props
    onClickDelete()
  }

  onClickDetails = () => {
    const { onClickDetails } = this.props
    onClickDetails() 
  }

  render () {
    const { guestTeam, score, guestScore, location, gameDate, rawDateString, gameId, dateObject } = this.props;
    const gameDetailsUrl = '/gameDetails/' + guestTeam + '/' + rawDateString + '/' + gameId;
    const dateString = dateObject.getFullYear() + '/' + (dateObject.getMonth()+1) + '/' + dateObject.getDate();
    const minute = dateObject.getMinutes();
    const hour = dateObject.getHours();
    const updatedMinute = minute < 10 ? '0' + minute : minute;
    const updatedHour = hour < 10 ? '0' + hour : hour;
    const time = updatedHour + ':' + updatedMinute;
    const role = sessionStorage.getItem('userRole');
    return (
      <div style={{ width: '21rem', margin: '20px 10px' }}>
        <Card className='text-center' style={{ width: '21rem'}}>
          <Card.Header>Schedule</Card.Header>
          <Row>
          <Col xs={3}>SMG</Col>
          <Col xs={6}>
            <Card.Body>
              <Card.Title>{dateString}</Card.Title>
              <Card.Text>
                {time}
              </Card.Text>
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
          <Row>
          {role === 'ROLE_COACH' &&
          <Col>
            <Button
                style={{display:"block", margin: "0 auto", textAlign:"center"}}
                onClick={this.onClickEdit}>
                Edit
            </Button>
          </Col>
          }
          <Col>
            <Button
                style={{display:"block", margin: "0 auto", textAlign:"center"}}
            >
                <Link style={{color: "white"}} to={gameDetailsUrl}>Details</Link>
            </Button>
          </Col>
          {role === 'ROLE_COACH' &&
          <Col>
            <Button
                style={{display:"block", margin: "0 auto", textAlign:"center"}}
                onClick={this.onClickDelete}
            >
              Delete
            </Button>
          </Col>
          }
          </Row>
        </Card>
      </div>
    )
  }
}

