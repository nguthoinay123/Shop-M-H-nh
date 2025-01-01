import { useState } from 'react';
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner10 } from "react-icons/im";

const Login=(props)=>{
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [isShowPassword, setIsShowPassword] = useState(false);
    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
    const handleLogin=async()=>{
        //validate
        const isValidEmail=validateEmail(email);
            if(!isValidEmail){
            toast.error('invalid email')
            // toast.success("ss")
            // toast.info()

            return ;
            }
            if(!password){
            toast.error('invalid password')
            }
        setIsLoading(true)
        //sumitlogin
        let data = await postLogin(email, password)
        console.log('check',data)
        if(data && data.EC===0){
            dispatch(doLogin(data))
            toast.success(data.EM)
            setIsLoading(false)
            navigate('/')
          }
          if(data && data.EC!==0){
            toast.error(data.EM)
            setIsLoading(false)

            
          }
    }
    return (
        <div className="login-container">
            <div className="login-header">
                <span>Don't have an account yet?</span>
                <button onClick={()=>{navigate('/signup')}}>Sign up</button>
            </div>
            <div className="login-title col-4 mx-auto">
                Login
            </div>
            <div className="login-welcome col-4 mx-auto">
                Hello Who's this?
            </div>
            <div className="content-form col-4 mx-auto">
                <div className="form-group">
                    <label>Email</label>
                    <input type={"email"} className="form-control" value={email} onChange={(event)=> setEmail(event.target.value)}/>
                </div>
                <div className="form-group pass-group">
                    <label>Password</label>
                    <input type={isShowPassword ? "text" : "password"} className="form-control" value={password} onChange={(event)=> setPassword(event.target.value)}/>
                    {isShowPassword ?
                        <span className="icons-eye"
                            onClick={() => setIsShowPassword(false)}>
                            <VscEye />
                        </span>
                        :
                        <span className="icons-eye"
                            onClick={() => setIsShowPassword(true)}>
                            <VscEyeClosed />
                        </span>
                    }
                </div>
                <span className='forgot-password'>Forgot password?</span>
                <div>
                    <button className="btn-submit" onClick={()=>handleLogin()} disabled={isLoading}>
                       {isLoading === true && <ImSpinner10 className="loader-icon"/>} 
                        <span>Login</span>
                    </button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={()=> { navigate('/')}}>&lt;- Go to Homepage</span>
                </div>
            </div>
        </div>
    )
}
export default Login;