import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Review = ({ tableNumber }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit to API later
    alert('Review submitted!');
    navigate('/menu');
  };

  return (
    <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Review Your Order (Table {tableNumber})</h2>
      <form onSubmit={handleSubmit} className="w-full">
        <label className="block mb-2">Rating:</label>
        <select value={rating} onChange={(e) => setRating(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-4">
          {[1, 2, 3, 4, 5].map((num) => <option key={num} value={num}>{num} Stars</option>)}
        </select>
        <label className="block mb-2">Comment:</label>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-4" rows="4" />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Submit Review
        </button>
      </form>
      <button onClick={() => navigate('/menu')} className="mt-4 text-blue-600 hover:underline">Back to Menu</button>
    </div>
  );
};

export default Review;
