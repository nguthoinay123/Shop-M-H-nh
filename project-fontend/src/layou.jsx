import { BrowserRouter, Route, Routes  } from "react-router-dom";
import App from './App';
// import Admin from './components/admin/admin';
// import DashBoard from './components/admin/content/dashboard';
// import ManageUser from './components/admin/content/manageuser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./components/Home/HomePage";
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Product from "./components/Products/Product";
import ProductByCategory from "./components/Products/ProductByCategory";
import ProductDetail from "./components/Products/Productdetail";
import Cart from "./components/Cart/Cart";
import Profile from "./components/Auth/Profile";
import Payment from "./components/Payment/Payment";
import PaymentDone from "./components/Payment/PaymentDone";
import Admin from "./components/Admin/admin";

const NotFound=()=>{
    return(
        <div className="alert alert-danger container mt-3">
            Not Found data with your current URL
        </div>
    )
}
const ProgressBar = ({ progress = 0 }) => {
  // Logic của component
};

const Layout=(props)=>{
    
    return (
        <>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<HomePage/>} />
                    <Route path="product" element={<Product/>} />
                    <Route path="category/:slug" element={<ProductByCategory />} />
                    <Route path="/product/detail/:slug" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart/>} />
                    <Route path="/user/profile" element={<Profile/>} />
                    <Route path="/payment" element={<Payment/>} />
                    <Route path="/payment/done" element={<PaymentDone/>}/>
                </Route>
                <Route path="admin" element={<Admin />}>
                    {/* <Route index element={<DashBoard />} />  */}
                </Route>
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
               />
           
        </>
    )
}
export default Layout;