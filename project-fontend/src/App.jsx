import { Outlet } from 'react-router-dom';
import './App.scss';
import Header from './components/header/header';
import Footer from './components/Footer/Footer';


const App = () => {
  return (
    <div className="App-container">
      <div className="header-container">
      <Header />
      </div>
      <div className="main-container">
          <div className="sidenav-container">

          </div>
          <div className="app-content">
              <Outlet/>
          </div>
      </div>
      <div className="footer-container">
      <Footer />
      </div>
    </div> 
  );
}

export default App;
