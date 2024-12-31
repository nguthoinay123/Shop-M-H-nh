import { useState } from 'react';
import './Signup.scss'
import { useNavigate } from 'react-router-dom';
import { postSignup } from '../../services/apiService';
import { toast } from 'react-toastify';
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const Signup = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [repassword, setRepassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);

    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSignup = async () => {
        // Validate email
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Invalid email');
            return;
        }

        // Check if passwords match
        if (password !== repassword) {
            toast.error('Passwords do not match');
            return;
        }

        // Validate password
        if (!password) {
            toast.error('Password cannot be empty');
            return;
        }

        try {
            const data = await postSignup(email, password, username, repassword);
            if (data && data.EC === 0) {
                toast.success(data.EM);
                navigate('/login');
            } else {
                toast.error(data.EM);
            }
        } catch (error) {
            console.error("Error during signup:", error);
            toast.error("Signup failed. Please try again.");
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-header">
                <span>Already have an account?</span>
                <button onClick={() => { navigate('/login') }}>Login</button>
            </div>
            <div className="signup-title col-4 mx-auto">
                Signup
            </div>
            <div className="signup-welcome col-4 mx-auto">
                You don't have an account yet
            </div>
            <div className="content-form col-4 mx-auto">
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" value={username} onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div className="form-group pass-group">
                    <label>Password</label>
                    <input type={isShowPassword ? "text" : "password"} className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} />
                    {isShowPassword ?
                        <span className="icons-eye" onClick={() => setIsShowPassword(false)}>
                            <VscEye />
                        </span> :
                        <span className="icons-eye" onClick={() => setIsShowPassword(true)}>
                            <VscEyeClosed />
                        </span>
                    }
                </div>
                <div className="form-group pass-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" value={repassword} onChange={(event) => setRepassword(event.target.value)} />
                </div>
                <span className='forgot-password'>Forgot password?</span>
                <div>
                    <button className="btn-submit" onClick={handleSignup}>Signup</button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => { navigate('/') }}>&lt;- Go to Homepage</span>
                </div>
            </div>
        </div>
    );
};

export default Signup;
