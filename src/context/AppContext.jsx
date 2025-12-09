import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";
export const AppContext = createContext();

// Use proxy in development (vite.config.js), or env variable in production
// Don't set baseURL if using vite proxy
if(import.meta.env.VITE_BACKEND_URL && import.meta.env.MODE === 'production') {
    axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
}
axios.defaults.withCredentials=true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add request interceptor to handle FormData correctly
axios.interceptors.request.use(
    (config) => {
        // If data is FormData, remove Content-Type header to let browser set it with boundary
        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
            console.error('Network Error: Make sure backend server is running on port 5000');
        }
        return Promise.reject(error);
    }
);
export const AppContextProvider = ({ children }) => {
    const currency=import.meta.env.VITE_CURRENCY || '₹';
    const navigate=useNavigate();
    const [user,setUser]=useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isSeller,setIsSeller]=useState(() => {
        const storedIsSeller = localStorage.getItem("isSeller");
        return storedIsSeller ? JSON.parse(storedIsSeller) : null;
    });
    const [showUserLogin,setShowUserLogin]=useState(false)
    const [products,setproduct]=useState([]);
    const [cartItems,setcartItems]=useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : {};
    });
    const [searchQuery,setsearchQuery]=useState("");
    const [wishlist,setWishlist]=useState([]);
    const [recentlyViewed,setRecentlyViewed]=useState(() => {
        const stored = localStorage.getItem("recentlyViewed");
        return stored ? JSON.parse(stored) : [];
    });
    const [filters,setFilters]=useState({
        category:"",
        minPrice:"",
        maxPrice:"",
        minRating:"",
        sortBy:"newest",
        inStock:true
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
    }, [recentlyViewed]);

    useEffect(() => {
        if (isSeller) {
            localStorage.setItem("isSeller", JSON.stringify(isSeller));
        } else {
            localStorage.removeItem("isSeller");
        }
    }, [isSeller]);

    const logout = async () => {
        try {
            await axios.get('/api/user/logout');
            setUser(null);
            setIsSeller(null);
            setcartItems({});
            localStorage.removeItem("user");
            localStorage.removeItem("cart");
            localStorage.removeItem("isSeller");
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    };

    const fetchproduct=async(params={})=>{
        try {
            const queryParams = new URLSearchParams();
            if(params.search) queryParams.append('search', params.search);
            if(params.category) queryParams.append('category', params.category);
            if(params.minPrice) queryParams.append('minPrice', params.minPrice);
            if(params.maxPrice) queryParams.append('maxPrice', params.maxPrice);
            if(params.minRating) queryParams.append('minRating', params.minRating);
            if(params.sortBy) queryParams.append('sortBy', params.sortBy);
            if(params.inStock !== undefined) queryParams.append('inStock', params.inStock);
            
            const {data}=await axios.get(`/api/product/list?${queryParams.toString()}`)
            // server returns an array of products. accept both formats.
            if (Array.isArray(data)) {
                setproduct(data);
            } else if (data && Array.isArray(data.products)) {
                setproduct(data.products);
            } else if (data && data.success && Array.isArray(data.products)) {
                setproduct(data.products);
            } else {
                console.error('Unexpected product list response:', data);
                toast.error("Error while fetching data");
            }
        } catch (error) {
            toast.error("Error while fetching data")
        }
    }
    
    const addToRecentlyViewed=(productId)=>{
        if(!productId) return;
        let viewed=structuredClone(recentlyViewed);
        viewed=viewed.filter(id=>id!==productId);
        viewed.unshift(productId);
        if(viewed.length>10) viewed=viewed.slice(0,10);
        setRecentlyViewed(viewed);
    }
    
    const fetchWishlist=async()=>{
        if(!user) return;
        try {
            const {data}=await axios.get('/api/wishlist/get');
            if(data.success){
                setWishlist(data.products || []);
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    
    const addToWishlist=async(productId)=>{
        if(!user){
            toast.error("Please login to add to wishlist");
            return;
        }
        try {
            const {data}=await axios.post('/api/wishlist/add',{productId});
            if(data.success){
                setWishlist(data.wishlist?.products || []);
                toast.success("Added to wishlist");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error adding to wishlist");
        }
    }
    
    const removeFromWishlist=async(productId)=>{
        if(!user) return;
        try {
            const {data}=await axios.post('/api/wishlist/remove',{productId});
            if(data.success){
                setWishlist(data.wishlist?.products || []);
                toast.success("Removed from wishlist");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error removing from wishlist");
        }
    }
    
    const isInWishlist=(productId)=>{
        return wishlist.some(item=>item._id===productId || item.toString()===productId);
    }
    const fetchSeller=async()=>{
        try {
            const {data}=await axios.get('/api/seller/is-auth');
            if(data && data.success){
                setIsSeller(true);
                localStorage.setItem("isSeller", "true");
            }
            else{
                setIsSeller(false);
                localStorage.removeItem("isSeller");
            }
        } catch (error) {
            // If 401, seller is not authenticated
            if(error.response?.status === 401){
                setIsSeller(false);
                localStorage.removeItem("isSeller");
            } else {
                console.log('Error checking seller auth:', error.message);
                setIsSeller(false);
            }
        }
    }
    const fetchUser=async()=>{
        try {
            const {data}=await axios.get('/api/user/is-auth');
            if(data.success){
                setUser(data.user);
            }
            else{
                setUser(null);
                setIsSeller(null);
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    const addToCart=(itemId)=>{
        let cartData=structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId]+=1;
        }
        else{
            cartData[itemId]=1;
        }
        setcartItems(cartData);
        toast.success("Added To Cart")
    }
    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setcartItems(cartData);
        toast.success("Cart Updated");
    }
    const removeFromCart=(itemId)=>{
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
        toast.success("Removed From Cart");
        setcartItems(cartData);
    }
    const getCartCount=()=>{
        let totalItem=0;
        for(const item in cartItems){
            totalItem+=cartItems[item];
        }
        return totalItem;
    }
    const getCartAmount=()=>{
        let totalAmount=0;
        for(const items in cartItems){
            let itemInfo=products.find((product)=>product._id===items);
            if(itemInfo && cartItems[items]>0){
                totalAmount+=itemInfo.offerPrice*cartItems[items]

            }
        }
        return Math.floor(totalAmount *100)/100;
    }
    useEffect(()=>{
        fetchproduct();
        fetchSeller();
        fetchUser();
    },[])
    
    useEffect(()=>{
        if(user){
            fetchWishlist();
        }
    },[user])
    
    const value = {
        navigate,user,setUser,isSeller,setIsSeller,showUserLogin,setShowUserLogin,
        products,currency,addToCart,updateCartItem,removeFromCart,cartItems,setcartItems,
        searchQuery,setsearchQuery,getCartCount,getCartAmount,axios,
        fetchproduct,fetchUser,fetchSeller,logout,
        wishlist,addToWishlist,removeFromWishlist,isInWishlist,fetchWishlist,
        recentlyViewed,addToRecentlyViewed,
        filters,setFilters
    };
    return (<AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>)
}
export const UseAppContext = () => {
    return useContext(AppContext);
}