import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import LoggedInName from '../components/LoggedInName';
import ModalComponent from './Modals/ModalComponent';
import LoginModal from './Modals/LoginModal';
import RegisterModal from './Modals/RegisterModal';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';




function MainLogin()
{
   

    let gimmie = localStorage.getItem('user_data');
    let gimmieMoar = JSON.parse(gimmie);
    let dynamicMain;
    
    

    if(gimmieMoar)
    {
        
        dynamicMain = 
        <div> 
        <span id="inner-title">Welcome to MyGameList</span><br />
        <p>you ARE already logged in! Your login is: {gimmieMoar.userName}</p>
        <LoggedInName />
        </div>
        
    }
    else
    {
        
        dynamicMain = 
        <div>
            <span id="inner-title">Welcome to MyGameList</span><br />
            
            
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                       
                            <ModalComponent
                                buttonType ={"Login"}
                                title={"Login"}
                                body={""}
                                componentType={LoginModal}
                            />
                       
                        <Navbar.Text style={{marginLeft: '.5rem'}}>{''}</Navbar.Text>
                            <ModalComponent
                                buttonType ={"Register"}
                                title={"Register"}
                                body={""}
                                componentType={RegisterModal}
                            />
                      
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
        
    }


    return(

        <div>
            {dynamicMain}
        </div>
    );
}

export default MainLogin;
