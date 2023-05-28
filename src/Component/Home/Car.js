import React from 'react';
import imgg from '../images/JS.png';

function Car() {
  return (
    <div className='main_con'>
      <div className='sec_con'>
        <img src={imgg} alt="" />
      </div>
      <br />
      <div className="car__details">
        <h2> Title </h2>
        <br />
        <h4> Description  </h4>
        <ul>
          <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, dignissimos!</li>
          <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, dignissimos!</li>
          <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, dignissimos!</li>
          <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, dignissimos!</li>
          <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, dignissimos!</li>
          <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, dignissimos!</li>
        </ul>
      </div>
    </div>
  )
}

export default Car
