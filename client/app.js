import React, { Component } from 'react'
import { enter, moveRightAndRotate, wagTail, breathing, blinking, treatTime, bark } from './animations'
const { remote, BrowserWindow } = window.require('electron')
const currentWindow = remote.getCurrentWindow()

let childWindow;

function createChild () {
  // Create the browser window.
  let currentPosition = currentWindow.getPosition();
  childWindow = new remote.BrowserWindow({width: 400, height: 600, frame: false, titleBarStyle: 'customButtonsOnHover', resizable: false, opacity: 0.7, parent: remote.getCurrentWindow(), x: currentPosition[0], y: currentPosition[1]})
  // and load the index.html of the app.
  console.log(currentWindow.getPosition());
  childWindow.loadFile('./public/index-child.html')
}

export default class App extends Component {
  constructor() {
    super();
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.clickRemind = this.clickRemind.bind(this);
    this.addMore = this.addMore.bind(this);
    this.clickTreat = this.clickTreat.bind(this);
    this.clickPlay = this.clickPlay.bind(this);
  }

  componentDidMount() {
    wagTail();
    blinking();
  }

  handleBtnClick(evt) {
    const item = document.getElementById('list');
    if (item.style.display === 'none') {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
      // wagTail();
    }
    // breathing();
    // blinking();
  }

  showMenu(evt) {
    const menu = evt.target.nextElementSibling;
    if (menu.style.display === 'none') {
      menu.style.display = 'block';
    } else {
      menu.style.display = 'none';
    }
    // childWindow.show();
  }
  clickPlay(evt) {
    createChild();
  }

  clickRemind(evt) {
    const reminders = document.getElementById('remind');
    if (reminders.style.display === 'none') {
      reminders.style.display = 'block';
    } else {
      reminders.style.display = 'none';
    }
  }

  clickTreat(evt) {
    const treat = document.getElementById('treat-image');
    treat.style.left = '0px';
    treat.style.top = '0px';
    treat.style.display = 'block';
    treatTime();
  }

  addMore(evt) {
    let even = true;
    function setAlarm(evt) {
      const alarmElement = evt.target.closest('div');
      const hour = alarmElement.querySelector('.hour').value; 
      const minute = alarmElement.querySelector('.minute').value; 
      const now = new Date();
      const due = new Date(now.getYear()+1900,now.getMonth(),now.getDate(),Number(hour),Number(minute));
      setTimeout(function() {currentWindow.focus(); bark(); alarmElement.style.display = 'none';}, due.getTime() - now.getTime());
      const content = alarmElement.querySelector('.content').value;
      if (even) {
        alarmElement.innerHTML = '<div class="todo even">' + content + '</div>';
        even = false;
      } else {
        alarmElement.innerHTML = '<div class="todo odd">' + content + '</div>';
        even = true;
      }

    }
    const item = document.createElement('div');
    item.innerHTML = '<input type="text" class="content"></input><input type="text" name="hour" class="hour time"/>:<input type="text" name="minute" class="minute time"/><button class="add">Set</button>';
    evt.target.parentElement.appendChild(item);
    item.querySelector('button').addEventListener('click', setAlarm);
  }

  render() {
    return (
      <div>
        <div id="not-barking">
          <img id="tail" src="../public/waggingTail.png" />
          <img id="body" src="../public/body-no-tail.png" />
          <img id="blink" src="../public/blink.png" />
          <img id="mouth" src="../public/mouth.png"/>
        </div>
        <div id="barking">
          <img id="bark" src="../public/bark-detail.png"/>
        </div>
        <button id="menu" onClick={this.showMenu}>Menu</button>
        <div id="menu-select">
          <button id="play" onClick={this.clickPlay}>Play</button>
          <button id="treat" onClick={this.clickTreat}>Treat</button>
          <button id="set" onClick={this.clickRemind}>Remind</button>
          <img id="treat-image" src="../public/treat.png"/>
          <div id="remind">
            <button className="add" onClick={this.addMore}>+</button>
          </div>
        </div>
      </div>
    )
  }
}