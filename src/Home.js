import { Container, InputGroup, FormControl, Row, Col, Button } from 'react-bootstrap'
import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'
import uuidv4 from 'uuid/v4'
import Axios from 'axios'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'



export const Home = () => {
    const [todos, setTodos] = useState([])
    const [targDate, setStartDate] = useState(new Date());
    const todoNameRef = useRef()
    const todoDescRef = useRef()

    useEffect(() => {
        Axios.get('http://ec2-3-141-40-226.us-east-2.compute.amazonaws.com:3001/api/get').then((response)=> {
            // console.log(response);
            setTodos(response.data);
        })
    }, [])


    function submitTodo(e){
        const name = todoNameRef.current.value;
        const desc = todoDescRef.current.value;
        const dueDate = formatDate(targDate);
        
        if(name === '' || desc === '' ) return

        Axios.post('http://ec2-3-141-40-226.us-east-2.compute.amazonaws.com:3001/api/insert',{
            todoName: name, 
            todoDesc: desc, 
            targDate: dueDate
        })
        setTodos(prevTodos => {
            return [...prevTodos, { id: uuidv4(), name: name, description: desc, target_date: dueDate}]
        });
        todoNameRef.current.value = null
        todoDescRef.current.value = null
    }

    function toggleTodo(id){
        const newTodos = [...todos]
        const todo = newTodos.find(todo => todo.id === id)
        todo.complete = !todo.complete
        // console.log(newTodos)
        setTodos(newTodos)
    }

    function markCompleted(id, completion_date){
        // const newTodos = [...todos]
        // console.log(newTodos)
        // console.log("todo to update = " + formatDate(completion_date))
        // console.log("todo to update = " + id);
        Axios.put('http://ec2-3-141-40-226.us-east-2.compute.amazonaws.com:3001/api/update',{
            todoId: id, 
            complete: "1", 
            compDate: formatDate(completion_date)
        })
        setTodos(todos)

    }

    function deleteTodos(e){
        console.log('we are here ready to delete');
        const newTodos = todos.filter(todo => !todo.complete)
        const deletedTodos = todos.filter(todo => todo.complete)
        deletedTodos.forEach((element, index, array) => {
            Axios.delete('http://ec2-3-141-40-226.us-east-2.compute.amazonaws.com:3001/api/delete', {data:{ todoId: element.id}});
            console.log("deleted element: " + element.id);
        });
        setTodos(newTodos)

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
        
        <br></br>
        <Container>
            <Row>
                <Col sm={8}><TodoList todos={todos} toggleTodo={toggleTodo} markCompleted={markCompleted}/></Col>
                <Col sm={4}>
                    <Row>
                        <InputGroup size="md" className="mb-3">
                            <InputGroup.Prepend><InputGroup.Text id="inputGroup-sizing-sm">New Task</InputGroup.Text></InputGroup.Prepend>
                            <FormControl ref={todoNameRef} aria-describedby="inputGroup-sizing-sm" />`
                        </InputGroup>
                    </Row>
                    <Row>
                        <InputGroup size="md" className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Description</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl ref={todoDescRef} as="textarea" />
                        </InputGroup>
                    </Row>
                    <Row>
                        <Row>
                            <Col>
                            <InputGroup size="md" className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Due By</InputGroup.Text>
                                </InputGroup.Prepend>
                            </InputGroup>
                            </Col>
                                <DatePicker selected={targDate} onChange={date => setStartDate(date)} />
                            <Col>
                            </Col>
                        </Row>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <Button variant="primary" size="lg" block onClick={submitTodo}>Add a Task</Button>
                        </Col>
                        <Col sm={6}>
                            <Button variant="primary" size="lg" block onClick={deleteTodos}>Clear Completed</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
        </>
    )
}
