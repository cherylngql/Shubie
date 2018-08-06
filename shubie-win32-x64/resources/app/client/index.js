import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
import { enter, wagTail, moveRightAndRotate } from './animations'

// const btn = document.getElementById('get');
// const item = document.getElementById('list');
// btn.addEventListener('click', function() {
//   if (item.style.display === 'none') {
//     item.style.display = 'block';
//   } else {
//     item.style.display = 'none';
//   }
//   // moveRightAndRotate();
//   wagTail();
// });