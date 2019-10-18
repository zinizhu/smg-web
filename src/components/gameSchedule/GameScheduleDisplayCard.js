import React from 'react';

import {Row, Col, Button} from 'react-bootstrap';

export class GameScheduleDisplayCard extends React.Component {
    constructor(props) {
        super(props);
    }

    onClickEdit = () => {
        const { onClickEdit } = this.props;
        onClickEdit();
    }

    onClickDelete = () => {
        const { onClickDelete } = this.props;
        onClickDelete();
    }

    render() {
        const { guestTeam, score, guestScore, location, gameDate } = this.props;
        const dateString = gameDate[0] + '/' + gameDate[1] + '/' + gameDate[2];
        return (
            <div style={{borderStyle:" solid", borderRadius:"3px", width:"300px", display:"block", margin:"20px auto", padding:"20px"}}>
                <Row>
                    <Col xs={4}>
                        <Row style={{display:"block", margin: "0 auto", textAlign:"center"}}>SMG</Row>
                    </Col>
                    <Col xs={4}>
                        <Row style={{display:"block", margin: "0 auto", textAlign:"center"}}>{dateString}</Row>
                        <Row style={{display:"block", margin: "0 auto", textAlign:"center"}}>{score} - {guestScore}</Row>
                        <Row style={{display:"block", margin: "0 auto", textAlign:"center"}}>{location}</Row>
                    </Col>
                    <Col xs={4}>
                        <Row style={{display:"block", margin: "0 auto", textAlign:"center"}}>{guestTeam}</Row>
                    </Col>
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
            </div>
        );
    }
}