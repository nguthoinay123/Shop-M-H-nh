import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { getPayment, postProcessPayment } from "../../services/apiService";

const Payment = () => {
    const [cartData, setCartData] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [note, setNote] = useState("");
    const [name, setName] = useState(""); 
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const account = useSelector((state) => state.user.account);

    const navigate = useNavigate(); // Sử dụng useNavigate

    useEffect(() => {
        fetchCartData();

        if (account) {
            setName(account.name || "");
            setPhone(account.phone || "");
            setAddress(account.address || "");
        }
    }, [account]);

    const fetchCartData = async () => {
        try {
            const data = await getPayment();
            if (data.EC === 0) {
                setCartData(data.DT);
            } else {
                toast.error("Không thể tải dữ liệu giỏ hàng!");
            }
        } catch (error) {
            console.error("Lỗi tải giỏ hàng:", error);
            toast.error("Đã xảy ra lỗi khi tải dữ liệu!");
        }
    };

    const handleSubmitPayment = async (event) => {
        event.preventDefault();

        if (!paymentMethod) {
            toast.error("Vui lòng chọn phương thức thanh toán!");
            return;
        }

        if (!cartData || cartData.total === 0) {
            toast.error("Giỏ hàng của bạn đang trống!");
            return;
        }

        try {
            setIsLoading(true);

            const payload = {
                paymentMethod,
                amount: cartData.total,
                name,
                phone,
                address,
                note,
            };

            const res = await postProcessPayment(payload);

            if (res && res.EC === 0) {
                toast.success("Thanh toán thành công!");
                navigate("/payment/done"); 
            } else {
                toast.error(res.EM || "Thanh toán thất bại. Vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Lỗi thanh toán:", error);
            toast.error("Đã xảy ra lỗi khi xử lý thanh toán!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main>
            <form onSubmit={handleSubmitPayment}>
                <section className="pb-5">
                    <div className="banner-h2 d-flex justify-content-center">
                        <h2 className="text-uppercase text-dominant">Giỏ hàng của bạn</h2>
                    </div>
                    <div className="banner-h5 d-flex justify-content-center">
                        <p className="text-secondary">Trang chủ / Giỏ hàng / Thanh toán</p>
                    </div>

                    <div className="container checkout-container">
                        <div className="row">
                            <div className="col-md-7">
                                <h4 className="mb-4 text-danger">THÔNG TIN THANH TOÁN</h4>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control mt-2"
                                            placeholder="Họ và tên *"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            name="phone"
                                            className="form-control mt-2"
                                            placeholder="Số điện thoại *"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <textarea
                                        className="form-control"
                                        name="address"
                                        rows="3"
                                        placeholder="Địa chỉ giao hàng..."
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <textarea
                                        className="form-control"
                                        name="note"
                                        rows="3"
                                        placeholder="Ghi chú cho đơn hàng (nếu có)"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="col-md-5">
                                <div className="card">
                                    <div className="card-header">ĐƠN HÀNG CỦA BẠN</div>
                                    <div className="card-body">
                                        <ul className="list-group mb-3">
                                            <li className="list-group-item d-flex justify-content-between">
                                                <span>Phí giao hàng</span>
                                                <strong>Miễn phí</strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between">
                                                <span>Tổng thanh toán</span>
                                                <strong>
                                                    {cartData.total
                                                        ? cartData.total.toLocaleString("vi-VN")
                                                        : "0 VNĐ"} VNĐ
                                                </strong>
                                            </li>
                                        </ul>
                                        <div className="my-3">
                                            {[
                                                { id: "cod", name: "Trả tiền mặt khi nhận hàng" },
                                                { id: "vnpay", name: "Thanh toán VNPay" },
                                                { id: "momo", name: "Thanh toán Momo" },
                                            ].map((method) => (
                                                <div className="form-check" key={method.id}>
                                                    <input
                                                        id={method.id}
                                                        value={method.id}
                                                        name="paymentMethod"
                                                        type="radio"
                                                        className="form-check-input"
                                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                                        required
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor={method.id}
                                                    >
                                                        {method.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            className="btn btn-outline-danger"
                                            type="submit"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Đang xử lý..." : "Đặt hàng"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
        </main>
    );
};

export default Payment;
