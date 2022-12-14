//import { useState } from 'react';

import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';


class LoginModal extends Component 
{

    constructor(props)
    {
        super(props);

        this.state = 
        {
        
            userName: '',
            password: '',
            message: '',
            success: false
        }
    }

    app_name = 'my-game-list-front';

    buildPath = (route) =>
    {
        if (process.env.NODE_ENV === 'production') 
        {
            return 'https://' + this.app_name +  '.herokuapp.com/' + route;
        }
        else
        {        
            return 'http://localhost:5000/' + route;
        }
        
    }

    doLogin = async () => 
    {
        //event.preventDefault();
        //alert("user: " + this.state.userName + " pass: " + this.state.password);
        let obj = {login:this.state.userName, password:this.state.password};
        let js = JSON.stringify(obj);

        try
        {    
            //let build = this.buildPath('api/login');
            //alert(build);
            const response = await fetch(this.buildPath('api/login'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            //alert("we arrived past the api!");

            let res = JSON.parse(await response.text());

            //alert(res.id);
            if( res.id <= 0 )
            {
                this.setMessage('User/Password combination incorrect');
                //alert("local storage is: " + localStorage.getItem('user_data'));
            }
            else
            {
                
                let user = {firstName:res.firstName,lastName:res.lastName,id:res.id, userName:res.userName}
                localStorage.setItem('user_data', JSON.stringify(user));
                //alert("local storage is: " + localStorage.getItem('user_data'));

                //let gimmie = localStorage.getItem('user_data');
                //let gimmieMoar = JSON.parse(gimmie);
                //alert("paresed local storage is: " + gimmieMoar);
                
                
                //alert("hello: " + gimmieMoar.id + " " + gimmieMoar.firstName);
                //fine for string but need to convert locastorage.getitem using stringify or parse

                this.setMessage('');
                this.state.success = true;
            }
        }
        catch(e)
        {
            alert(e.toString());
        }    
    };

    setMessage = (msg) =>{
        this.setState({ message: msg})
    }

    onSubmit = async () =>{
        //console.log(this.state.userName + " " + this.state.password);
        
 
        await this.doLogin();

        if(this.state.success)
        {
            this.props.onClick({msg: 'Modal Sumbitted'}); //dis hides da modal
            //to do: change this to homepage, we have no way to get to games so leaving it for now
            //const currentPath = window.location.pathname;
            //window.location.href = currentPath; 
            window.location.href = '/games';
        }
        else
        {

            
        }
    }

    onHide = () =>{
        console.log(this.state.userName + " " + this.state.password);
        this.props.onHide({msg: 'we exited da modal'});
        this.setState(
            {
                userName: '',
                password: ''
            }
        )
        console.log(this.state.userName + " " + this.state.password);
        this.setMessage('');

    }

    onkeyPress = (e) =>{

        if(e.keyCode === 13) 
        {
           this.onSubmit();
        }

    }

    render()
    {
        return (
            <div>
                <Modal show={this.props.show} onHide={() => {this.onHide();console.log("ayy");}}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.props.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.body}
                        <Form>
                        <Form.Group className ="mb-3" controlid="topInput">
                            <FloatingLabel label = "Username">
                                <Form.Control type = "text" placeholder="username" value ={this.state.userName} autoFocus
                                              onChange ={e => this.setState({ userName: e.target.value})}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className ="mb-3" controlid="bottomInput">
                            <FloatingLabel label = "Password">
                                <Form.Control type = "password" placeholder="password" value ={this.state.password}
                                              onChange ={e => this.setState({ password: e.target.value})}
                                              onKeyDown={this.onkeyPress}
                                />
                                <Form.Text id="passwordHelp" muted> {/*to do: aria-describedby for assisted technologies */}
                                    {this.state.message}
                                </Form.Text>
                            </FloatingLabel>
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {this.onHide();}}>Close</Button>
                        <Button variant="primary" onClick={() => {this.onSubmit();}}>Submit</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    };
}

export default LoginModal;