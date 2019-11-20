import React from 'react';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker'
const axios = require('axios');

import { Form, Col, Button } from 'react-bootstrap';

import "react-datepicker/dist/react-datepicker.css";

export class AddTrainingPlan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            time: '',
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

    onDateChange = (dateObj) => {
        console.log('Date: ', dateObj);
        const dateString = dateObj.getFullYear() + '/' + (dateObj.getMonth()+1) + '/' + dateObj.getDate();
        this.setState({ date: dateString, dateSelected: false });
    }

    onTimeChange = (time) => {
        this.setState({time: time});
    }

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

        const { date, time } = this.state;
        const trainingPlan = itemsStringArr.join(';');
        const timeString = (new Date(date + ' ' + time)).toISOString();
        console.log(timeString);
        const request = {
            date: timeString,
            trainingPlan: trainingPlan,
            summary: ''
        }

        // post back
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

        const { date, dateSelected, items } = this.state;

        return (
            <div style={{ margin:"10px auto", padding:"10px 10px", borderStyle:"solid", borderColor:"#bdbdbd", borderWidth:"thick", borderRadius:"8px" }}>
                <h3>Add New Training Plan</h3>
                <Form onSubmit={this.onSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="date">
                            <Form.Label>Date</Form.Label>
                            <Form.Control placeholder="Select practice date" onChange={this.onChange} onFocus={this.onFocus} value={date}/>
                            {
                                dateSelected && 
                                <Calendar   
                                    value={new Date()}
                                    onChange={this.onDateChange}
                                />
                            }
                        </Form.Group>
                        <Form.Group as={Col} controlId="time">
                            <Form.Label>Time</Form.Label>
                            <TimePicker
                                onChange={this.onTimeChange}
                                value={this.state.gameTime}
                            />
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
                                                <Button variant="primary" type="button" onClick={this.onAddNewItem} style={{ marginRight: "5px" }}>
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

