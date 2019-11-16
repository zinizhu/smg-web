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
    const { guestTeam, score, guestScore, location, gameDate, rawDateString } = this.props
    const dateString = gameDate[0] + '/' + gameDate[1] + '/' + gameDate[2]
    const gameDetailsUrl = '/gameDetails/' + guestTeam + '/' + rawDateString;
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
          <Col>
            <Button
                style={{display:"block", margin: "0 auto", textAlign:"center"}}
                onClick={this.onClickEdit}>
                Edit
            </Button>
          </Col>
          <Col>
            <Button
                style={{display:"block", margin: "0 auto", textAlign:"center"}}
                // onClick={this.onClickDetails}
            >
                <Link style={{color: "white"}} to={gameDetailsUrl}>Details</Link>
            </Button>
          </Col>
          <Col>
            <Button
                style={{display:"block", margin: "0 auto", textAlign:"center"}}
                onClick={this.onClickDelete}
            >
              Delete
            </Button>
          </Col>
          </Row>
        </Card>
      </div>
    )
  }
}

