import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TableNumberEntry = ({ setTableNumber }) => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTableNumber(input.trim());
      navigate('/menu');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-64 bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Enter Your Table Number</h2>
      <form onSubmit={handleSubmit} className="w-full">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., T5"
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Proceed to Menu
        </button>
      </form>
    </div>
  );
};

export default TableNumberEntry;
