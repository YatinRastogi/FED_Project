import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartProvider.jsx'; // Adjust path
import TableNumberEntry from './components/TableNumberEntry.jsx';
import MenuPage from './components/MenuPage.jsx';
import Cart from './components/Cart.jsx';
import OrderStatus from './components/OrderStatus.jsx';
import Review from './components/Review.jsx';
import ChefLogin from './components/ChefLogin.jsx'; // Add this import
import ChefDashboard from './components/ChefDashboard.jsx'; // Assuming you have this from previous code

function App() {
  const [tableNumber, setTableNumber] = useState('');

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 font-sans">
          <header className="bg-green-600 text-white p-4 text-center">
            <h1 className="text-2xl font-bold">Basil Restaurant</h1>
          </header>
          <main className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<TableNumberEntry setTableNumber={setTableNumber} />} />
              <Route path="/menu" element={tableNumber ? <MenuPage tableNumber={tableNumber} /> : <Navigate to="/" />} />
              <Route path="/cart" element={tableNumber ? <Cart tableNumber={tableNumber} /> : <Navigate to="/" />} />
              <Route path="/order-status" element={tableNumber ? <OrderStatus tableNumber={tableNumber} /> : <Navigate to="/" />} />
              <Route path="/review" element={tableNumber ? <Review tableNumber={tableNumber} /> : <Navigate to="/" />} />
              {/* Chef Routes */}
              <Route path="/chef/login" element={<ChefLogin />} />
              <Route
                path="/chef/dashboard"
                element={localStorage.getItem('token') ? <ChefDashboard /> : <Navigate to="/chef/login" />}
              />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
