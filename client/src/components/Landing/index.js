import { Link } from 'react-router-dom'
import Button from 'material-ui/Button';
import React from 'react';
import './Landing.css';

//  const LandingPage = () => <h1>Landing Page!</h1>;


const LandingPage = () => {
  return (
        <div className ="box" >
            <h1 id="head-title">Play music from everywhere</h1> 
            <img src = "/cell.png"/>
            <p id="middle-title">Search, play, create, and share from anywhere</p>

            <div>
                
                <ul id='provider'>
                    <li><img src = "/icons/vimeo.png" /></li>
                    <li><img src = "/icons/soundcloud.png" /></li>
                    <li><img src ="/icons/youtube.png"  /></li>
                    <li><img src = "/icons/spotify.png" /></li>
                </ul>
              
                <Link to = "/login">  <Button to="/music" id="sign-btn" >Sign up for free    </Button></Link>

            </div>
        </div>
  ); 
};

export default LandingPage;
