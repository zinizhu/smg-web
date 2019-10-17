import React from 'react';
import Calendar from 'react-calendar';
const axios = require('axios');

import { Form, Col, Button } from 'react-bootstrap';

import "react-datepicker/dist/react-datepicker.css";

export class AddTrainingPlan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            time: new Date().getTime(),
            dateSelected: false,
            items: [{
                id: 1,
                content: ''
            }]
        }
    }

    onInputChange = (e) => {
        const value = e.target.value;
        const selectedItemId = e.target.id;

        const currentItems = this.state.items;
        const newItems = currentItems.map((item, idx) => {
            if (idx === parseInt(selectedItemId)) {
                item.id = idx;
                item.content = value;
            }
            return item;
        });

        this.setState({items: newItems});
    }

    onDeleteItem = (e) => {
        const selectedItemId = e.target.id;
        const currentItems = this.state.items;
        if (currentItems.length === 1) return;
        const itemsAfterDeletion = currentItems.filter((item, idx) => {
            return idx !== parseInt(selectedItemId);
        });
        const newItems = itemsAfterDeletion.filter((item, idx) => {
            item.id = idx;
            return item;
        });
        console.log('new items', newItems);
        this.setState({items: newItems});
    }

    onDateChange = (date) => {
        this.setState({ date: date, dateSelected: false });
    };

    onFocus = () => {
        this.setState({dateSelected: true});
    }

    onAddNewItem = () => {
        var currentItems = this.state.items;
        currentItems.push({
            id: 0,
            content: ''
        });
        this.setState({ items: currentItems });
    }

    onSubmit = () => {
        const itemsStringArr = this.state.items.map((item) => {
            return item.content;
        })
        const trainingPlan = itemsStringArr.join(';');
        // console.log(trainingPlan);
        const request = {
            date: this.state.date,
            trainingPlan: trainingPlan,
            summary: ''
        }

        /// post back
        axios({
            method: 'post',
            data: request,
            url: 'http://localhost:8080/api/trainingPlan'
        }).
        then((res) => {
            console.log('New training plan added.');
        })

    }

    render() {

        const { date, time, dateSelected, items } = this.state;

        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="date">
                            <Form.Label>Date</Form.Label>
                            <Form.Control placeholder="Select practice date" onChange={this.onChange} onFocus={this.onFocus} value={date.toLocaleDateString()}/>
                            {
                                dateSelected && 
                                <Calendar   
                                    value={date}
                                    onChange={this.onDateChange}
                                />
                            }
                        </Form.Group>
                        <Form.Group as={Col} controlId="time">
                            <Form.Label>Time</Form.Label>
                            <Form.Control placeholder="Enter practice time"/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Plans</Form.Label>
                        </Form.Group>
                    </Form.Row>
                            {
                                items &&
                                items.map((item, idx) => {
                                    console.log(item);
                                    return (
                                        <Form.Row key={idx}>
                                            <Form.Group as={Col} controlId={idx}>
                                                <Form.Control placeholder="" onChange={this.onInputChange} controlId={idx} value={item.content}/>
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Button variant="primary" type="button" onClick={this.onAddNewItem} >
                                                    +
                                                </Button>
                                                <Button variant="primary" type="button" onClick={this.onDeleteItem} id={idx}>
                                                    -
                                                </Button>
                                            </Form.Group>
                                        </Form.Row>
                                    );
                                })
                            }
                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                </Form>
            </div>
        );
    }
}

