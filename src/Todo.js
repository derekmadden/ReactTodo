import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { InputGroup, ListGroup, ButtonGroup, Button, Row, Col } from 'react-bootstrap'
import Axios from 'axios'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function Todo({ todo, toggleTodo, markCompleted }) {
    console.log(todo);

    


    const [compDate, setStartDate] = useState(new Date());
    // todo.completion_date = compDate
    var compDateButtonLabel
    var compDateLabel = ''
    if (todo.complete == '1'){
        compDateLabel = 'Completed on ' + formatDate(todo.completion_date)
        compDateButtonLabel = 'Update Completion Date'
    } else {
        compDateButtonLabel = 'Mark Complete'
    }

    var variantStyleLabel = '';
    var overduestring = '';
    if (Date.parse(todo.target_date) < Date.parse(todo.completion_date)){
        variantStyleLabel = "danger"
        overduestring = 'overdue';
    } else if (todo.complete == '0' &&  Date.parse(new Date()) > Date.parse(todo.target_date)){
        console.log("a task was finished late")
        variantStyleLabel = "danger"
        overduestring = 'overdue';
    } else if (Date.parse(todo.target_date > Date.parse(todo.completion_date))){
        variantStyleLabel = "success"
    }

    

    

    function markTodoCompleted(){
        // console.log('we are here. id = ' + todo.id + 'and completion date = ' + todo.completion_date)
        markCompleted(todo.id, compDate);
    }

    function handleTodoClick() {
        toggleTodo(todo.id);
    }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [month, day, year].join('-');
    }
      

    return (

        <>
            
                <ListGroup>
                    <ListGroup.Item action variant={variantStyleLabel}>
                        <Row>
                            <Col sm={8}>
                                <h5>{todo.name}</h5>
                            </Col>
                            <Col>
                            Due By: {todo.target_date}<br></br><b>{overduestring}</b></Col>
                        </Row>
                        <Row>
                            <Col>
                                {todo.description}
                            </Col>
                        </Row>
                        <br></br>
                        <Row>
                            <Col sm={7}>
                                {/* <InputGroup>
                                    <InputGroup.Checkbox checked={todo.complete} onChange={handleTodoClick} aria-label="Checkbox for following text input" />
                                </InputGroup> */}
                            </Col>
                            <Col sm={5}>
                                <DatePicker selected={compDate} onChange={date => setStartDate(date)} />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={7}>
                                {compDateLabel}
                            </Col>
                            <Col sm={5}>
                                <ButtonGroup size="sm">
                                    <Button onClick={markTodoCompleted}>{compDateButtonLabel}</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
        </>


    )
}
