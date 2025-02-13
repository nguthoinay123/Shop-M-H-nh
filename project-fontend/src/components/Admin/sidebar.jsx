import './Sidebar.scss'
import { BiTachometer } from "react-icons/bi";
import { FaChartLine } from "react-icons/fa";
import { FaTicketAlt } from "react-icons/fa";
import { IoListCircleOutline } from "react-icons/io5";
import { FaUserCheck } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";

const Sidebar = () => {
  return (
    <div className="sidebar pb-3 bg-light">
      <nav className="navbar bg-light navbar-light d-flex justify-content-between px-4">
        {/* Logo và thương hiệu */}
        <a href="#" className="navbar-brand">
          <h3 className="text-primary">
            <i className="fa fa-hashtag me-2"></i>THAI AN
          </h3>
        </a>

        {/* Avatar và tên người dùng bên phải */}
        {/* <div className="navbar-nav ms-auto align-items-center">
          <div className="nav-item dropdown">
            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              <img
                className="rounded-circle me-2"
                src="/image/avatar/default-avatar-profile.jpg"
                alt="avatar"
                style={{ width: "40px", height: "40px" }}
              />
              <span className="d-none d-lg-inline-flex">User Name</span>
            </a>
            <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
              <a href="#" className="dropdown-item">Đăng xuất</a>
            </div>
          </div>
        </div> */}
      </nav>

      <nav className="navbar bg-light navbar-light">
        <div className="d-flex align-items-center ms-4 mb-4">
          <div className="position-relative">
            <img
              className="rounded-circle"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSByxaqs7wvnjE_eXck4OncqbtkiHvrvyKg8Q&s"
              alt="avatar"
              style={{ width: "40px", height: "40px" }}
            />
            <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
          </div>
          <div className="ms-3">
            <h6 className="mb-0">User Name</h6>
            <span>User Role</span>
          </div>
        </div>
        <div className="navbar-nav w-100">
          <a href="#" className="nav-item nav-link">
            <BiTachometer />  
           Tổng Quan
          </a>
          <a href="#" className="nav-item nav-link">
           <FaChartLine />
            Sản Phẩm
          </a>
          <a href="#" className="nav-item nav-link">
            <FaTicketAlt />
            Vouchers
          </a>
          <a href="#" className="nav-item nav-link">
           <IoListCircleOutline />
            Danh Mục
          </a>
          <a href="#" className="nav-item nav-link">
            <FaUserCheck />
            Người Dùng
          </a>
          <a href="#" className="nav-item nav-link">
           <BsFillCartCheckFill />
            Đơn Hàng
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
