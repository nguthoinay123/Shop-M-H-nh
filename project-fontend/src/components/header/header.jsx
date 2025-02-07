import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCategory } from "../../services/apiService";
import { getProductbyCategory } from "../../services/apiService";
import { FaPhoneVolume } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import { IoSearchCircleOutline } from "react-icons/io5";
import { logout } from "../../redux/action/userAction";
const Header = (props) => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const account = useSelector(state => state.user.account);
  const [categories, setCategories] = useState([]);
  const [dataProductByCategory, getDataProductByCategory] = useState([]);
  const [showSearch, setShowSearch] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const cartCount = useSelector(state => state.cart.productCount || 0);


  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleLogout = () => {
    // Xóa token ở localStorage hoặc sessionStorage nếu bạn lưu token ở đó
    localStorage.removeItem('access_token');
    // Dispatch action logout để cập nhật Redux store
    dispatch(logout());

    navigate('/login');
  };
const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  useEffect(() => {
    getDataCategory();
    getDataProductByCategory();
  }, []);

  const getDataCategory = async () => {
    const res = await getCategory();
    if (res && res.EC === 0) {
      setCategories(res.DT);
    }
  };

  return (
    <div>
     <div className="bg-secondary bg-opacity-75 py-2">
      <div className="container">
        <div className="row align-items-center">
          {/* Contact Info */}
          <div className="col-6 d-flex gap-3">
            <span className="d-flex align-items-center text-white">
              <MdEmail />
              <span className="ms-1">noyeye21@gmail.com</span>
            </span>
            <span className="d-flex align-items-center text-white">
              <FaPhoneVolume />
              <span className="ms-1">0867675940</span>
            </span>
          </div>

          <div className="col-6 text-white text-end">
            <div className="d-flex justify-content-end align-items-center ">
              {isAuthenticated === false ?
                <>
                  <button className="btn-login" onClick={handleLogin}>Log in</button>
                  <button className="btn-sigup" onClick={handleSignup}>Sign up</button>
                </> :
                <NavDropdown 
                  title="Setting" id="basic-nav-dropdown">
                  <NavDropdown.Item>{account.name}</NavDropdown.Item>
                  <NavDropdown.Item onClick={()=>navigate('/user/profile')}>Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              }
            </div>
          </div>
        </div>
      </div>
    </div>



    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to='/' className="navbar-brand">Mô Hình Shop</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to='/' className="nav-link">Trang Chủ</NavLink>
            <NavDropdown title="Sản Phẩm" id="basic-nav-dropdown" >
              <NavDropdown.Item onClick={() => navigate('/product')} >
                Tất Cả Sản Phẩm
              </NavDropdown.Item>
              {categories && categories.length > 0 &&
                categories.map((item, index) => (
                  <NavDropdown.Item 
                    key={index} 
                    onClick={() => navigate(`/category/${item.slug}`,{state:{  categoriestitle: item.description}})}
                  >
                    {item.name}
                  </NavDropdown.Item>
                ))
              }
            </NavDropdown>
            <NavLink to='/about' className="nav-link">Giới Thiệu</NavLink>
            <NavLink to='/contact' className="nav-link">Liên Hệ</NavLink>
          </Nav>
          <div className="d-flex justify-content-end align-items-center gap-3">
              
              {showSearch && (
                <input
                  type="text"
                  className="form-control"
                  style={{ width: "200px", height: "30px" }}
                  placeholder="Tìm kiếm..."
                />
              )}
            <IoSearchCircleOutline
                            style={{ fontSize: "30px", cursor: "pointer" }}
                            onClick={toggleSearch} 
                          />
          <div style={{ position: "relative" }}>
                <FaCartPlus
                  style={{ fontSize: "26px", cursor: "pointer" }}
                  onClick={() => navigate('/cart')}
                />
                {isAuthenticated && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "50%",
                      padding: "2px 6px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      lineHeight: 1,
                    }}
                  >
                    {/* {cartCount} */}
                  </span>
                )}
              </div>
            </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
};

export default Header;
