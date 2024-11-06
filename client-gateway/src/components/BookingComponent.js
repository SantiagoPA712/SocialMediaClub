import React, { useState, useEffect } from 'react';
import { getBookings, addBooking } from '../services/bookingService';

function BookingComponent() {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    EventName: '',
    EventDate: '',
    GuestName: '',
    GuestEmail: '',
    GuestCount: 1,
    SpecialRequests: ''
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getBookings();
      setBookings(response.data.bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking({ ...newBooking, [name]: value });
  };

  const handleAddBooking = async () => {
    try {
      await addBooking(newBooking);
      fetchBookings(); 
      setNewBooking({
        EventName: '',
        EventDate: '',
        GuestName: '',
        GuestEmail: '',
        GuestCount: 1,
        SpecialRequests: ''
      });
    } catch (error) {
      console.error('Error adding booking:', error);
    }
  };

  return (
    <div>
      <h2>Book an Event</h2>
      <label>
        Event Name:
        <input name="EventName" value={newBooking.EventName} onChange={handleInputChange} />
      </label>
      <label>
        Event Date:
        <input type="date" name="EventDate" value={newBooking.EventDate} onChange={handleInputChange} />
      </label>
      <label>
        Guest Name:
        <input name="GuestName" value={newBooking.GuestName} onChange={handleInputChange} />
      </label>
      <label>
        Guest Email:
        <input name="GuestEmail" type="email" value={newBooking.GuestEmail} onChange={handleInputChange} />
      </label>
      <label>
        Guest Count:
        <input type="number" name="GuestCount" value={newBooking.GuestCount} onChange={handleInputChange} min="1" />
      </label>
      <label>
        Special Requests:
        <input name="SpecialRequests" value={newBooking.SpecialRequests} onChange={handleInputChange} />
      </label>
      <button onClick={handleAddBooking}>Add Booking</button>

      <h3>Current Bookings</h3>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.EventID}>
            {booking.EventName} - {booking.GuestName} ({booking.GuestCount} guests)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookingComponent;



