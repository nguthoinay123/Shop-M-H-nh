import { useNavigate } from 'react-router-dom';
// import videoHomePage from '../../assets/video-homepage.mp4'
import { useSelector } from 'react-redux';
const HomePage=()=>{
    const isAuthenticated= useSelector( state=> state.user.isAuthenticated);
    const navigate = useNavigate();
    return (
        <div className="homepage-container">

            {/* <video autoPlay muted loop>
                <source 
                    src={videoHomePage}
                    type="video/mp4"/>
            </video> */}
            <div className="homepage-content">
                <div className="title-content-1">There is a better way to ask</div>
                <div className="title-content-2">
                    You don't want to make a boring from.
                    And your audience won't anwer one.
                    Create a typeform instead-and make everyon happy.
                </div>
                <div className="title-content-3">
                    {isAuthenticated=== false ?
                    <button onClick={()=>{navigate('/login')}}>Get's started. It's free</button>
                    :
                    <button onClick={()=>{navigate('/users')}}>Doing quiz now</button>

                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage;