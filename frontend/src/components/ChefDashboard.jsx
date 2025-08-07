import { useState, useEffect } from 'react';
import axios from 'axios';

const ChefDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        // Fetch real pending orders (with auth token)
        const ordersResponse = await axios.get('/api/orders/pending', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(ordersResponse.data);

        // Fetch inventory alerts (dummy for now; replace with real /api/inventory/alerts if available)
        const alertsResponse = await axios.get('https://dummyjson.com/products');
        setAlerts(alertsResponse.data.products.slice(0, 3).map(p => ({
          ingredient: p.title,
          expiry: 'In 2 days',
        })));
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/orders/${orderId}/update`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Refresh orders after update
      const updatedOrders = await axios.get('/api/orders/pending', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(updatedOrders.data);
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const calculateWaitTime = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diff = Math.floor((now - created) / 60000); // Minutes
    return `${diff} min`;
  };

  if (loading) return <p className="text-center text-gray-500">Loading dashboard...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Chef Dashboard</h2>
      
      {/* Expiring Ingredients Alerts */}
      {/* <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Expiring Ingredients Alerts</h3>
        {alerts.length === 0 ? (
          <p className="text-gray-500">No alerts.</p>
        ) : (
          <ul className="space-y-2">
            {alerts.map((alert, idx) => (
              <li key={idx} className="bg-yellow-100 p-2 rounded text-yellow-800">
                {alert.ingredient} - Expires {alert.expiry}
              </li>
            ))}
          </ul>
        )}
      </div> */}
      
      {/* Pending Orders */}
      <h3 className="text-xl font-semibold mb-2">Pending Orders</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Table</th>
              <th className="p-2 text-left">Items</th>
              {/* <th className="p-2">Wait Time</th> */}
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b"> {/* Use order._id for key */}
                <td className="p-2">{order.tableNumber}</td>
                <td className="p-2">{order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}</td> {/* Display items with quantity */}
                {/* <td className="p-2">{calculateWaitTime(order.createdAt)}</td> */}
                <td className="p-2">{order.status}</td>
                <td className="p-2">
                  <button onClick={() => updateStatus(order._id, 'preparing')} className="px-2 py-1 bg-yellow-500 text-white rounded mr-1">Preparing</button>
                  {/* <button onClick={() => updateStatus(order._id, 'ready')} className="px-2 py-1 bg-blue-500 text-white rounded mr-1">Ready</button> */}
                  <button onClick={() => updateStatus(order._id, 'completed')} className="px-2 py-1 bg-green-500 text-white rounded">Completed</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChefDashboard;
