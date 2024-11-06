import React from 'react';
import BookingComponent from './components/BookingComponent';
import LiquorComponent from './components/LiquorComponent';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Social Media Club - Event Booking and Liquor Orders</h1>
      <div className="container">
        <div className="booking-section">
          <BookingComponent />
        </div>
        <div className="liquor-section">
          <LiquorComponent />
        </div>
      </div>
    </div>
  );
}

export default App;

