import React from 'react'

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

  render () {
    const { guestTeam, score, guestScore, location, gameDate } = this.props
    const dateString = gameDate[0] + '/' + gameDate[1] + '/' + gameDate[2]
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

// <Row>
// <Col xs={4}>
//     <Row style={{display:"block", margin: "0 auto", textAlign:"center"}}>SMG</Row>
// </Col>
// <Col xs={4}>
//     <Row style={{display:"block", margin: "0 auto", textAlign:"center"}}>{dateString}</Row>
//     <Row style={{display:"block", margin: "0 auto", textAlign:"center"}}>{score} - {guestScore}</Row>
//     <Row style={{display:"block", margin: "0 auto", textAlign:"center"}}>{location}</Row>
// </Col>
// <Col xs={4}>
//     <Row style={{display:"block", margin: "0 auto", textAlign:"center"}}>{guestTeam}</Row>
// </Col>
// </Row>
// <Row>
// <Col>
//     <Button
//         style={{display:"block", margin: "0 auto", textAlign:"center"}}
//         onClick={this.onClickEdit}>
//         Edit
//     </Button>
// </Col>
// <Col>
//     <Button
//         style={{display:"block", margin: "0 auto", textAlign:"center"}}
//         onClick={this.onClickDelete}
//     >
//         Delete
//     </Button>
// </Col>
// </Row>

// style={{
//     borderStyle: ' solid',
//     borderRadius: '3px',
//     width: '300px',
//     display: 'block',
//     margin: '20px auto',
//     padding: '20px'
//   }}
