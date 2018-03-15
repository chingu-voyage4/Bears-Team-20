import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import 'Player.css';

export default class Player extends Component {

    render() {
        return 
        <div id="player-container">
            PLAYER!!
            <ReactPlayer 
            url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
            playing 
            />
        </div>
    }
}