import { useNavigate } from 'react-router-dom';

const OrderStatus = ({ tableNumber }) => {
  const navigate = useNavigate();
  const status = 'Preparing'; // Mock; fetch later

  return (
    <div className="flex flex-col items-center justify-center h-64 bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Order Status for Table {tableNumber}</h2>
      <p className="text-lg mb-4">Current Status: <span className="font-bold text-green-600">{status}</span></p>
      <button onClick={() => navigate('/review')} className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
        Leave a Review
      </button>
      <button onClick={() => navigate('/menu')} className="mt-4 text-blue-600 hover:underline">Back to Menu</button>
    </div>
  );
};

export default OrderStatus;
