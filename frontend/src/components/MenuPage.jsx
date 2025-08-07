import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/cart-context.js'; // Adjust path if needed

// Fallback mock data (with ingredients and full description)
// const mockMenus = [
//   {
//     id: '1',
//     name: 'Margherita Pizza',
//     description: 'Spread tomato sauce on pizza dough, add cheese and basil, bake until golden.',
//     ingredients: ['Pizza dough', 'Tomato sauce', 'Mozzarella cheese', 'Fresh basil'],
//     price: 12.99,
//     imageUrl: 'https://via.placeholder.com/150',
//   },
//   {
//     id: '2',
//     name: 'Caesar Salad',
//     description: 'Mix romaine lettuce with dressing, add croutons and parmesan cheese.',
//     ingredients: ['Romaine lettuce', 'Caesar dressing', 'Croutons', 'Parmesan cheese'],
//     price: 8.99,
//     imageUrl: 'https://via.placeholder.com/150',
//   },
//   {
//     id: '3',
//     name: 'Spaghetti Bolognese',
//     description: 'Cook pasta, prepare meat sauce with tomatoes and herbs, combine and serve.',
//     ingredients: ['Spaghetti', 'Ground beef', 'Tomatoes', 'Onions', 'Garlic'],
//     price: 14.50,
//     imageUrl: 'https://via.placeholder.com/150',
//   },
// ];

// const MenuPage = ({ tableNumber }) => {
// eslint-disable-next-line no-unused-vars
const MenuPage = ({ tableNumber }) => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, totalItems } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        // Fetch from DummyJSON Recipes API
        const response = await axios.get('https://dummyjson.com/recipes');
        
        // Map API data to menu format
        const formattedMenus = response.data.recipes.map((recipe) => ({
          _id: recipe.id.toString(), // Use recipe ID
          name: recipe.name,
          description: recipe.instructions.join(' '), // Full description (join array into single string)
          ingredients: recipe.ingredients, // Full ingredients array
          price: (recipe.caloriesPerServing / 10).toFixed(2), // Derive price from calories for demo
          imageUrl: recipe.image || 'https://via.placeholder.com/150', // Use image or placeholder
        }));
        
        setMenus(formattedMenus); // Set the formatted array
      } catch (err) {
        console.error('Error fetching from DummyJSON API:', err);
        setError('Failed to load menu from API. Using sample data.');
        // setMenus(mockMenus); // Fallback to mock array
      } finally {
        setLoading(false);
      }
    };
    fetchMenus();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading menu...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  // Safeguard: Only map if menus is an array and has items
  if (!Array.isArray(menus) || menus.length === 0) {
    return <p className="text-center text-gray-500">No menu items available.</p>;
  }

  return (
    <div>
      {/* <h2 className="text-2xl font-bold mb-6 text-center">Menu for Table {tableNumber}</h2> */}
      <h2 className="text-2xl font-bold mb-6 text-center">Menu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menus.map((item) => (
          <div key={item._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-green-600 font-bold mt-2">${item.price}</p>
              
              {/* Full Description */}
              {/* <div className="mt-2">
                <h4 className="font-semibold text-gray-800">Description:</h4>
                <p className="text-gray-600 max-h-32 overflow-y-auto">{item.description}</p>
              </div> */}
              
              {/* Ingredients List */}
              <div className="mt-2">
                <h4 className="font-semibold text-gray-800">Ingredients:</h4>
                <p className="text-gray-600 max-h-32 overflow-y-auto">
                  {item.ingredients.join(', ')} {/* Join into comma-separated paragraph */}
                </p>
              </div>
              


              <button
                onClick={() => addToCart(item)}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate('/cart')}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
      >
        View Cart ({totalItems})
      </button>
    </div>
  );
};

export default MenuPage;
