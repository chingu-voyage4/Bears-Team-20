/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import { deepPurple } from 'material-ui/colors';


const LandingContainer = styled.div`
  color: ${deepPurple[50]};
  text-align: center;
  display: flex;
  
  flex-direction: column;
`;

// https://css-tricks.com/perfect-full-page-background-image/

const BackgroundImage = styled.img`
  z-index: -1;
  /* Set rules to fill background */
  min-height: 100%;
  min-width: 1024px;
  /* Set up proportionate scaling */
  width: 100%;
  height: auto;
  /* Set up positioning */
  position: fixed;
  top: 0;
  left: 0;
`;

const Headline = styled.div`
  padding-top: 1em;
  font-size: 2em;
  color: ${deepPurple[50]};
  text-shadow: 1px 1px 2px #000000;
`;

const Middleline = styled.div`
  padding: 0.5em 0;
  font-size: 1.8em;
  color: ${deepPurple[50]};
  text-shadow: 1px 1px 2px #000000;
`;

const ProviderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const StyledProviderItem = styled(ProviderItem)`
  margin: 0 0.25em;
  /* https://stackoverflow.com/questions/3186688/drop-shadow-for-png-image-in-css */
  -webkit-filter: drop-shadow(12px 12px 25px rgba(0,0,0,0.5));
  filter: url(#drop-shadow);
  -ms-filter: "progid:DXImageTransform.Microsoft.Dropshadow(OffX=12, OffY=12, Color='#444')";
  filter: "progid:DXImageTransform.Microsoft.Dropshadow(OffX=12, OffY=12, Color='#444')";
`;

const ButtonSignUp = styled(Button)`
  margin-top: 1em;
  margin-bottom: 0.75em;
`;

const StyledCentralImage = styled(CentralImage)`
`;

const StyledLink = styled(Link)`
  background-color: ${deepPurple[900]};
  border-radius: 3px;
  padding: 0.6em 1em;

  color: ${deepPurple[50]};
  text-decoration: none;
  box-shadow: 10px 10px 61px 3px rgba(0,0,0,0.75);
  text-shadow: 1px 1px 1px ${deepPurple[900]};
`;

const LandingPage = () => (
  <LandingContainer >
    <BackgroundImage src="/landing-bg-image.jpg" />
    <Headline>
      Play music from everywhere
    </Headline>
    <ButtonSignUp to="/signup">Sign up for free!</ButtonSignUp>
    <StyledCentralImage src="/cell.png" alt="" />
    <Middleline>Search, play, create, and share from anywhere</Middleline>
    <ProviderContainer>
      <StyledProviderItem src="/icons/vimeo.png" alt="" />
      <StyledProviderItem src="/icons/soundcloud.png" alt="" />
      <StyledProviderItem src="/icons/youtube.png" alt="" />
      <StyledProviderItem src="/icons/spotify.png" alt="" />
    </ProviderContainer>


    <svg height="0" xmlns="http://www.w3.org/2000/svg">
      <filter id="drop-shadow">
        <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
        <feOffset dx="12" dy="12" result="offsetblur" />
        <feFlood floodColor="rgba(0,0,0,0.5)" />
        <feComposite in2="offsetblur" operator="in" />
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </svg>
  </LandingContainer>
);


function ProviderItem(props) {
  return (
    <div className={props.className}>
      <img src={props.src} alt={props.alt} />
    </div>
  );
}

function CentralImage(props) {
  return (
    <div className={props.className}>
      <img src={props.src} alt={props.alt} />
    </div>
  );
}

function Button(props) {
  return (
    <div className={props.className}>
      <StyledLink to={props.to}>{props.children}</StyledLink>
    </div>
  );
}

export default LandingPage;
