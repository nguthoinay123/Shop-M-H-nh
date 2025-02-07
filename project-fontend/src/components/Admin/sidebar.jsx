import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
  } from 'react-pro-sidebar';
  import { FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
//   import sidebarBg from '../../assets/bg1.jpg';
  import { MdDashboard } from "react-icons/md";
  import { DiReact } from "react-icons/di";
  import './sidebar.scss'
import { Link } from 'react-router-dom';


  const SideBar=(props)=>{
    const { image, collapsed, toggled, handleToggleSidebar } = props;
    return (
        <>
           <ProSidebar
                    // image={sidebarBg}
                    collapsed={collapsed}
                    toggled={toggled}
                    breakPoint="md"
                    onToggle={handleToggleSidebar}
                    >
                <SidebarHeader>
                        <div
                    style={{
                        padding: '24px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: 14,
                        letterSpacing: '1px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                    >
                        <DiReact size={'3rem'} color={'#00bfff'}/>
                        <span>Trần Thái Ân</span>
                    </div>
                </SidebarHeader>

            <SidebarContent>
                <Menu iconShape="circle">
                <MenuItem
                    icon={<MdDashboard />}
                    // suffix={<span className="badge red">new</span>}
                >
                    <Link to="/admin"/>
                    Tổng Quan
                </MenuItem>
                {/* <MenuItem icon={<FaGem />}> components</MenuItem> */}
                </Menu>
                <Menu iconShape="circle">
                <SubMenu
                    // suffix={<span className="badge yellow">3</span>}
                    // icon={<FaRegLaughWink />}
                    icon={<FaGem/>}
                    title="Features"
                >
                    <MenuItem>Sản phẩm
                        {/* <Link to="/admin/manage-users"/> */}
                    </MenuItem>
                    <MenuItem>Danh mục</MenuItem>
                    <MenuItem>Người dùng</MenuItem>
                    <MenuItem>Đơn hàng</MenuItem>

                    <MenuItem>Vouchers</MenuItem>
                </SubMenu>
                
                </Menu>
            </SidebarContent>

            <SidebarFooter style={{ textAlign: 'center' }}>
                <div
                className="sidebar-btn-wrapper"
                style={{
                    padding: '20px 24px',
                }}
                >
                <a
                    href="https://www.facebook.com/AnMuoiNgon"
                    target="_blank"
                    className="sidebar-btn"
                    rel="noopener noreferrer"
                >
                    <FaGithub />
                    <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        viewSource
                    </span>
                </a>
                </div>
            </SidebarFooter>
            </ProSidebar>
        </>
    )
}
export default SideBar;