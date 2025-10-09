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

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin, setShowUserLogin,isSeller } = UseAppContext();

  return (
    <div className=' text-default-bg min-h-screen text-gray-700 bg-white'>
      {isSellerPath ? null : <Navbar />}
      <Toaster />

      {/* Login Overlay */}
      {showUserLogin && <Login setShowUserLogin={setShowUserLogin} />}

      {/* Main Content */}
      <div className={`${isSellerPath ? "" : "px-6 md:px-15 lg:px-24 xl:px-32"} ${showUserLogin ? "pointer-events-none select-none" : ""}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProduct/>}/>
          <Route path='/products/:category' element={<ProductCategory/>}/>
          <Route path='/products/:category/:id' element={<ProductDetails/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/add-address' element={<AddAddress/>}/>
          <Route path='/my-orders' element={<MyOrders/>}/>
          <Route path='/seller' element={isSeller?<SellerLayout/>:<SellerLogin/>}>
          <Route index element={isSeller?<AddProduct/>:null}/>
          <Route path='products-list' element={isSeller?<ProductList/>:null}/>
          <Route path='orders' element={<Orders/>}/>
          </Route>
        </Routes>
        {isSellerPath ? null : <Footer />}
      </div>
      </div>
  );
};

export default App;
