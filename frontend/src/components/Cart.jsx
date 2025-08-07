import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/cart-context.js'; // Adjust path

const Cart = ({ tableNumber }) => {
  const { cartItems, updateQuantity, removeItem, clearCart, totalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const placeOrder = async () => {
    try {
      // Map cartItems to simple format for backend
      const items = cartItems.map(item => ({ name: item.name, quantity: item.quantity }));

      // Send to backend
      await axios.post('/api/orders', { tableNumber, items });

      clearCart();
      navigate('/order-status');
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Cart for Table {tableNumber}</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Image</th> {/* New column for photos */}
                <th className="p-2 text-left">Item</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Price</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="p-2">
                    <img
                      src={item.imageUrl || 'https://via.placeholder.com/50'} // Use item image or placeholder
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded" // Small thumbnail styling
                    />
                  </td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2 text-center">
                    <button onClick={() => updateQuantity(item._id, -1)} className="px-2 bg-gray-200 rounded">-</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, 1)} className="px-2 bg-gray-200 rounded">+</button>
                  </td>
                  <td className="p-2">${(item.price * item.quantity).toFixed(2)}</td>
                  <td className="p-2">
                    <button onClick={() => removeItem(item._id)} className="text-red-600 hover:underline">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-right">
            <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
            <button onClick={placeOrder} className="mt-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
      <button onClick={() => navigate('/menu')} className="mt-4 text-blue-600 hover:underline">Back to Menu</button>
    </div>
  );
};

export default Cart;
