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
const NotFound=()=>{
    return(
        <div className="alert alert-danger container mt-3">
            Not Found data with your current URL
        </div>
    )
}
const Layout=(props)=>{
    return (
        <>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<HomePage/>} />
                   
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
            <ToastContainer />
        </>
    )
}
export default Layout;