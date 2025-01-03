import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCategory } from "../../services/apiService";
import { getProductbyCategory } from "../../services/apiService";
import { MdLanguage } from "react-icons/md";
import { logout } from "../../redux/action/counterAction.js"; // Giả sử bạn đã tạo action logout trong Redux.

const Header = (props) => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const account = useSelector(state => state.user.account);
  const [categories, setCategories] = useState([]);
  const [dataProductByCategory, getDataProductByCategory] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    // Điều hướng người dùng về trang chủ hoặc trang đăng nhập sau khi logout
    navigate('/login');
  };

  useEffect(() => {
    getDataCategory();
    getDataProductByCategory();
  }, []);

  const getDataCategory = async () => {
    const res = await getCategory();
    console.log(res);
    if (res && res.EC === 0) {
      setCategories(res.DT);
    }
  };

  return (
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
          <Nav>
            {isAuthenticated === false ?
              <>
                <button className="btn-login" onClick={handleLogin}>Log in</button>
                <button className="btn-sigup" onClick={handleSignup}>Sign up</button>
              </> :
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                <NavDropdown.Item>{account.name}</NavDropdown.Item>
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
