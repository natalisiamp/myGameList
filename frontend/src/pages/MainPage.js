import React, { useEffect, useState } from 'react';
import PageTitle from '../components/PageTitle';
import MainLogin from '../components/MainLogin';
import { Container, Row, Col } from 'react-bootstrap';
import ps4 from '../ps4Transparent.png';
import xbox from '../xboxTransparent.png';
import switchPic from '../switchTransparent.png';
import Card from 'react-bootstrap/Card';
import './MainPage.css';
import {Button} from 'react-bootstrap';
import Video from '../components/Video';
import Footer from '../components/Footer';
import xboxX from '../xboxXpic.png';
import ps5 from '../ps5Pic.png';
import pc from '../pcpic.png';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
//import {withRouter} from 'react-router-dom';

//this is the main page of the site
//should display multiple clickable consoles that then display popular games
//PageTitle is a component that displays the title of the page

const MainPage = () =>
{

    
    const currentUrl = window.location.href;
    const currentPath = window.location.pathname;
    console.log(currentUrl);
    console.log(currentPath);
    
    let renderCheck = false;

    const [stuff, setStuff] = useState('hellooooooo');
    const [toastShow, setToast] = useState(false);
    const [toastMsg, setMsg] = useState('');

    useEffect(() => 
    {
      const urlParams = new URLSearchParams(window.location.search);
      
      //Checks the url for the userId parameter. If it exists,
      //assume the user has arrived via verification link and
      //call the verify API
      if(urlParams.has('userId'))
      {
          const verifyId = urlParams.get('userId');
          const js = JSON.stringify({verifyId:verifyId});
          try
          {
            fetch(buildPath('api/users/verify'),
                 {method:'POST',body:js,headers:{'Content-Type': 'application/json'}}
            )
            .then(response => response.json()
            .then(json => {
              //alert(json.message);
              setMsg("Email has been verified. Congrats!");
              setToast(true);
            }));
            console.log("renderrrrr worked");
          }
          catch(e)
          {
            alert(e.toString());
          }
      }
      else
      {
        console.log("renderrrrr nooooo");
      }

      
    }, [renderCheck]);

    const app_name = 'my-game-list-front'

    function buildPath(route)
    {
        if (process.env.NODE_ENV === 'production')
        {
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        }
        else
        {
            return 'http://localhost:5000/' + route;
        }
    }

    function buildPlatformPath(platform)
    {
        if (process.env.NODE_ENV === 'production')
          {
            return 'https://' + app_name +  '.herokuapp.com/games/?platform=' + platform;
          }
          else
          {
              return 'http://localhost:3000/games/?platform=' + platform;
          }
        
    }

    function change()
    { console.log("workingggg");
      setStuff('yooooo');
    }


    return(
      
      <div>
       
        {/* MainLogin contains  the navbar (logo and login/register buttons)*/}
        <MainLogin />
        <ToastContainer className="p-3" position='middle-start'>
                    <Toast onClose={() => setToast(false)} show={toastShow} delay={5000} autohide>
                        <Toast.Header>
                        <strong className="me-auto">Alert!</strong>
                        <small></small>
                        </Toast.Header>
                        <Toast.Body>{toastMsg}</Toast.Body>
                    </Toast>
                </ToastContainer>
        <Video />
        
          {/* <Container className="gamePics"> */}
          <div class="container">
            {/* <Row className="rows"> */}
            <div class="row">
            {/* <Col className="columns"> */}
            <div class="col">
                <Card
                border="secondary"
                style={{width:'18rem',
                height:'350px'}}
                className="mb-2"
                >
                  <a href= {buildPlatformPath('PlayStation5')} target="_blank" rel="noreferrer">
                    <Card.Img className='consolepics' variant='top' src={ps5}/>
                  </a>
                  <Card.Body className='consoleText'>
                      <Card.Title>PlayStation 5 Games</Card.Title>
                      <Card.Text></Card.Text>
                  </Card.Body>
                </Card>
              </div>
            {/* </Col> */}
            {/* <Col className="columns"> */}
            <div class="col">
                <Card 
                bg="light"
                border="secondary"
                key="Primary"
                style={{width:'18rem',
                height:'350px'}}
                className="mb-2"
                
                >
                  <a href={buildPlatformPath('PlayStation4')}target="_blank" rel="noreferrer">
                  <Card.Img className='consolepics' variant="top" src={ps4}/>
                  </a>
                  <Card.Body className='consoleText'>
                    <Card.Title> PlayStation 4 Games</Card.Title>
                   
                  </Card.Body>
                </Card>
              </div>
            {/* </Col> */}
            {/* <Col className="columns"> */}
            <div class="col">
                <Card
                border="secondary"
                style={{width:'18rem',
                height:'350px'}}
                className="mb-2"
                >
                  <a href= {buildPlatformPath('NintendoSwitch')} target="_blank" rel="noreferrer">
                    <Card.Img className='consolepics' variant='top' src={switchPic}/>
                  </a>
                  <Card.Body className='consoleText'>
                      <Card.Title>Nintendo Switch Games</Card.Title>
                     
                  </Card.Body>
                </Card>
              </div>
            {/* </Col> */}
            {/* </Row>
            <Row> */}
            <div class="w-100"></div>
              {/* <Col className="columns"> */}
              <div class="col">
                <Card
                border="secondary"
                style={{width:'18rem',
                height:'350px'}}
                className="mb-2"
                >
                  <a href= {buildPlatformPath('XboxX')} target="_blank" rel="noreferrer">
                    <Card.Img className='consolepics' variant='top' src={xboxX}/>
                  </a>
                  <Card.Body className='consoleText'>
                      <Card.Title>Xbox Series X Games</Card.Title>
                      <Card.Text></Card.Text>
                  </Card.Body>
                </Card>
                </div>
                {/* </Col> */}

                {/* <Col className="columns"> */}
                <div class="col">
                <Card
                border="secondary"
                style={{width:'18rem',
                height:'350px'}}
                className="mb-2"
                >
                <a href= {buildPlatformPath('XboxOne')} target="_blank" rel="noreferrer">
                  <Card.Img className='consolepics' variant='top' src={xbox}/>
                </a>
                  <Card.Body className='consoleText'>
                    <Card.Title>Xbox One Games</Card.Title>
                   
                  </Card.Body>
                
                </Card>
                {/* </Col> */}
                </div>
               
            
              {/* <Col className="columns"> */}
              <div class="col">
                <Card
                border="secondary"
                style={{width:'18rem',
                height:'350px'}}
                className="mb-2"
                >
                  <a href= {buildPlatformPath('PC')} target="_blank" rel="noreferrer">
                    <Card.Img className='consolepics' variant='top' src={pc}/>
                  </a>
                  <Card.Body className='consoleText'>
                      <Card.Title>PC Games</Card.Title>
                      <Card.Text></Card.Text>
                  </Card.Body>
                </Card>
                </div>
              {/* </Col> */}
            
            
              </div>
            
            {/* </Row> */}
            </div>
          {/* </Container> */}
         
          <Footer/>
          
        {/* {stuff};
        <Button onClick={() => {change()}}>press</Button> */}
      </div>
    );
};

export default MainPage;



