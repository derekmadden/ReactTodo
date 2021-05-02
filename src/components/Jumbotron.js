import React from 'react'
import { Jumbotron as Jumbo, Container } from 'react-bootstrap'
import styled from 'styled-components';

const Styles = styled.div``;


export const Jumbotron = () => (
    <Styles>
        <Jumbo fluid className="jumbo">
            <div className="overlay"></div>
            <Container>
                <h1>Set up your Todo List!</h1>
            </Container>
        </Jumbo>
    </Styles>
)

