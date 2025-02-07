import { useEffect, useState } from "react";
import { getUserProfile, postUpdateProfile } from "../../services/apiService";
import anhmacdinh from '../../assets/hinhmacdinh.jpg';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../../redux/action/userAction';

const Profile = () => {
    const [getProfile, setGetProfile] = useState([]);
    const [name, setName] = useState(""); // state cho tên
    const [phone, setPhone] = useState(""); // state cho tên
    const [address, setAddress] = useState(""); // state cho tên
    const [loading, setLoading] = useState(false); // state để theo dõi trạng thái loading
    const dispatch = useDispatch();

    useEffect(() => {
        getDataProfile();
    }, []);

    const getDataProfile = async () => {
        setLoading(true);
        const data = await getUserProfile();
        setLoading(false);
        if (data && data.EC === 0) {
            setGetProfile(data.DT);
            setName(data.DT.name || "");
            setPhone(data.DT.phone || "");
            setAddress(data.DT.address || "");
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault(); // Ngăn chặn form gửi lại trang

        const updatedData = {
            name: name,
            phone: phone,
            address: address
        };

        setLoading(true); // Kích hoạt trạng thái loading
        const res = await postUpdateProfile(updatedData); // Gọi API để cập nhật
        setLoading(false); // Kết thúc loading

        if (res && res.EC === 0) {
            toast.success(res.EM); // Hiển thị thông báo thành công
            setGetProfile(res.DT); // Cập nhật lại thông tin người dùng trong local state
            dispatch(updateUserProfile(res.DT)); // Cập nhật lại Redux store
        } else {
            toast.error(res.EM); // Hiển thị thông báo thất bại
        }
    };

    return (
        <div className="container-fluid">
            <div className="container mb-5 p-md-5">
                <div className="row">
                    {/* Sidebar with Profile Picture */}
                    <div className="col-md-3">
                        <div className="bg-light pt-4 rounded text-center">
                            <div className="image-container position-relative d-inline-block avatar">
                                <img
                                    src={getProfile.image ? getProfile.image : anhmacdinh}
                                    alt="User"
                                    className="img-fluid rounded-circle mb-3"
                                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                />
                            </div>

                            <div className="pt-3">
                                <a className="nav-link text-dark fw-bold" href="/user/profile">
                                    Tài khoản
                                </a>
                                <br />
                                <a className="nav-link text-dark fw-bold" href="/orders">
                                    Đơn hàng
                                </a>
                                <br />
                                <a className="nav-link text-dark fw-bold" href="/voucher">
                                    Kho voucher
                                </a>
                                <br />
                            </div>
                        </div>
                    </div>

                    {/* Main Content - Profile Update */}
                    <div className="col-md-9">
                        <div className="bg-light p-4 rounded shadow-sm">
                            <h3>Thông Tin Tài Khoản</h3>
                            <form>
                                <div className="mb-3">
                                    <label>Email</label>
                                    <input
                                        disabled
                                        className="form-control"
                                        name="email"
                                        type="email"
                                        value={getProfile.email || ""}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Họ và tên</label>
                                    <input
                                        className="form-control"
                                        name="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Số điện thoại</label>
                                    <input
                                        className="form-control"
                                        name="phone"
                                        type="text"
                                        value={phone} // Hiển thị giá trị phone
                                        onChange={(e) => setPhone(e.target.value)} // Cập nhật giá trị phone khi thay đổi
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Địa chỉ</label>
                                    <input
                                        className="form-control"
                                        name="address"
                                        type="text"
                                        value={address} // Hiển thị giá trị address
                                        onChange={(e) => setAddress(e.target.value)} // Cập nhật giá trị address khi thay đổi
                                    />
                                </div>

                                <button
                                    className="btn btn-outline-success"
                                    type="submit"
                                    disabled={loading}
                                    onClick={handleUpdateProfile}
                                >
                                    Lưu
                                </button>

                                <button className="btn btn-outline-danger ms-2">
                                    Đổi mật khẩu
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
