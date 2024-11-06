import React, { useState, useEffect } from 'react';
import { getOrders, addOrder } from '../services/liquorService';

function LiquorComponent() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    LiquorType: '',
    Quantity: 1,
    StockLevel: 0,
    OrderDate: '',
    SupplierContact: '',
    ReorderThreshold: 1,
    EventServed: ''
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handleAddOrder = async () => {
    try {
      await addOrder(newOrder);
      fetchOrders(); 
      setNewOrder({
        LiquorType: '',
        Quantity: 1,
        StockLevel: 0,
        OrderDate: '',
        SupplierContact: '',
        ReorderThreshold: 1,
        EventServed: ''
      });
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  return (
    <div>
      <h2>Place a Liquor Order</h2>
      <label>
        Liquor Type:
        <input name="LiquorType" value={newOrder.LiquorType} onChange={handleInputChange} />
      </label>
      <label>
        Quantity:
        <input type="number" name="Quantity" value={newOrder.Quantity} onChange={handleInputChange} min="1" />
      </label>
      <label>
        Stock Level:
        <input type="number" name="StockLevel" value={newOrder.StockLevel} onChange={handleInputChange} min="0" />
      </label>
      <label>
        Order Date:
        <input type="date" name="OrderDate" value={newOrder.OrderDate} onChange={handleInputChange} />
      </label>
      <label>
        Supplier Contact:
        <input name="SupplierContact" value={newOrder.SupplierContact} onChange={handleInputChange} />
      </label>
      <label>
        Reorder Threshold:
        <input type="number" name="ReorderThreshold" value={newOrder.ReorderThreshold} onChange={handleInputChange} min="1" />
      </label>
      <label>
        Event Served:
        <input name="EventServed" value={newOrder.EventServed} onChange={handleInputChange} />
      </label>
      <button onClick={handleAddOrder}>Add Order</button>

      <h3>Current Orders</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.OrderID}>
            {order.LiquorType} - Quantity: {order.Quantity} (Stock Level: {order.StockLevel})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LiquorComponent;

