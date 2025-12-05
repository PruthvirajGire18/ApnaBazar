import React from 'react';
import Navbar from './components/Navbar';
import "./App.css";
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import { Toaster } from "react-hot-toast";
import Footer from './components/Footer';
import { UseAppContext } from './context/AppContext';
import Login from './components/Login';
import AllProduct from './pages/AllProduct';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
import MyOrders from './pages/MyOrders';
import SellerLogin from './components/seller/SellerLogin';
import SellerLayout from './pages/seller/SellerLayout';
import AddProduct from './pages/seller/AddProduct';
import ProductList from './pages/seller/ProductList';
import Orders from './pages/seller/Orders';
import OrderTracking from './pages/OrderTracking';
import Wishlist from './pages/Wishlist';

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin, setShowUserLogin,isSeller } = UseAppContext();

  return (
    <div className='text-default-bg min-h-screen text-gray-700 bg-gradient-to-br from-gray-50 via-white to-gray-50'>
      {isSellerPath ? null : <Navbar />}
      {isSellerPath ? null : <div className="h-20"></div>}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#333',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* Login Overlay */}
      {showUserLogin && <Login setShowUserLogin={setShowUserLogin} />}

      {/* Main Content */}
      <div className={`${isSellerPath ? "" : "px-3 sm:px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32"} ${showUserLogin ? "pointer-events-none select-none" : ""}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProduct/>}/>
          <Route path='/products/:category' element={<ProductCategory/>}/>
          <Route path='/products/:category/:id' element={<ProductDetails/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/add-address' element={<AddAddress/>}/>
          <Route path='/my-orders' element={<MyOrders/>}/>
          <Route path='/wishlist' element={<Wishlist/>}/>
          <Route path='/track-order/:trackingNumber' element={<OrderTracking/>}/>
          <Route path='/seller' element={isSeller === true ? <SellerLayout/> : <SellerLogin/>}>
            {isSeller === true && (
              <>
                <Route index element={<AddProduct/>}/>
                <Route path='products-list' element={<ProductList/>}/>
                <Route path='orders' element={<Orders/>}/>
              </>
            )}
          </Route>
        </Routes>
        {isSellerPath ? null : <Footer />}
      </div>
      </div>
  );
};

export default App;
