import { useEffect, useState } from "react";
import { getCart } from "../../services/apiService";
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {patchCartUpdate ,DeleteCart} from '../../services/apiService'
import { useDispatch } from 'react-redux';


const Cart=()=>{
    const [dataCart, setDataCart]= useState([]);
    const [subTotalAmount, setSubTotalAmount] = useState(0);
    const [TotalAmount, setTotalAmount] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        getDataCart();
    },[])
    const getDataCart=async()=>{
        const res = await getCart();
        if(res && res.EC===0){
            setDataCart(res.DT.myCart);
            setSubTotalAmount(res.DT.subTotal);
            setTotalAmount(res.DT.total);
        }
    }
    const updateCart = async (productId, quantity) => {
        const res = await patchCartUpdate(productId, quantity);

        if (res && res.EC === 0) {
           toast.success(res.EM)

            getDataCart();
        } else {
              toast.error(res.EM)
        }
    }

// Hàm xử lý sự kiện khi người dùng thay đổi số lượng sản phẩm
const handleUpdateQuantity = async (e, productId) => {
    e.preventDefault(); // Ngăn chặn form submit mặc định
    const quantity = parseInt(e.target.value); // Truy cập trực tiếp từ input
    if (quantity > 0) {
        updateCart(productId, quantity);
    } else {
        toast('Số lượng sản phẩm phải lớn hơn 0!');
    }
};

const handleRemoveItem = async (productId) => {
    const res = await DeleteCart(productId);
    if (res && res.EC === 0) {
        toast.success(res.EM); 
        getDataCart(); 
    } else {
        toast.error(res.EM);
    }
};


    return (
        <div>
            <section className="box-cart">
                <div className="banner-h2 d-flex justify-content-center">
                    <h2 className="text-uppercase text-dominant">Giỏ hàng của bạn</h2>
                </div>

                <div className="banner-h5 d-flex justify-content-center">
                    <p className="text-secondary">Trang chủ / Giỏ hàng</p>
                </div>
     <div className="container mt-5">
                    <div className="row">
                        <hr />
                        <div className="col-12 col-md-8">
                            <div className="d-flex justify-content-between">
                                <h3 className="text-secondary">SẢN PHẨM</h3>
                            </div>

                            {dataCart.map((item) => (
                                <div className="row cart-item align-items-center py-3" key={item.product.id}>
                                   {/* Hình ảnh sản phẩm */}
                                    <div className="col-2">
                                        <img
                                            className="img-fluid rounded"
                                            src={item.product.image}
                                            alt="Product Image"
                                            style={{ maxWidth: "100px" }}
                                        />
                                    </div>

                                    {/* Tên sản phẩm */}
                                    <div className="col-4">
                                        <p className="mb-0 fw-bold text-secondary">{item.product.name}</p>
                                    </div>

                                    {/* Giá sản phẩm */}
                                    <div className="col-2 text-center">
                                        <p className="mb-0 text-danger fw-bold">{item.product.price.toLocaleString('vi-VN')} VNĐ</p>
                                    </div>

                                    {/* Cập nhật số lượng */}
                                    <div className="col-3 d-flex align-items-center justify-content-center">
                                        <form
                                            onSubmit={(e) => handleUpdateQuantity(e, item.product.id)}
                                            className="d-flex align-items-center"
                                        >
                                            <input
                                                type="number"
                                                name="quantity"
                                                className="form-control text-center"
                                                value={item.quantity}
                                                min="0"
                                                max={item.product.instock}
                                                onChange={(e) => handleUpdateQuantity(e, item.product.id)} // Truyền e và productId
                                                style={{ maxWidth: "60px", marginRight: "10px" }}
                                            />

                                            <button type="submit" className="btn btn-link p-0 text-success px-2">
                                                <i className="fa-solid fa-rotate-right fs-5"></i>
                                            </button>
                                        </form>
                                    </div>

                                    {/* Xóa sản phẩm */}
                                    <div className="col-1 text-end">
                                        <button
                                            onClick={() => handleRemoveItem(item.product.id)}
                                            className="btn btn-danger text-white"
                                        >
                                            Xoá
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <hr />
                            <div className="d-flex">
                                <a onClick={()=> navigate('/product')} className="btn btn-link text-secondary text-decoration-none">
                                    &larr; Tiếp tục mua hàng
                                </a>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="checkout-summary" style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px' }}>
                                <h5 className="text-danger">CHI TIẾT THANH TOÁN</h5>
                                <div className="d-flex justify-content-between">
                                    <p>Tạm tính</p>
                                     <strong> {subTotalAmount.toLocaleString('vi-VN')} VNĐ </strong>
                                  </div>
                                <div className="d-flex justify-content-between">
                                    <p>Giao hàng</p>
                                    <p>Miễn phí vận chuyển</p>
                                </div>
                                <small>Miễn phí vận chuyển cho mọi đơn hàng.</small>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <p>Tổng thanh toán</p>
                                    <strong>{TotalAmount.toLocaleString('vi-VN')} VNĐ</strong>
                                </div>
                                {/* <div className="voucher-input mt-3">
                                    <form >
                                        <label htmlFor="voucher" className="form-label">Phiếu giảm giá</label>
                                        <input
                                            type="text"
                                            id="voucher"
                                            name="voucher"
                                            className="form-control"
                                            placeholder="Nhập mã ưu đãi"
                                        />
                                        <button type="submit" className="btn btn-outline-secondary mt-2 w-100">
                                            Áp dụng
                                        </button>
                                    </form>
                                    <div className="alert alert-success mt-2 d-flex justify-content-between align-items-center">
                                        <div></div>
                                        <button
                                            // onClick={handleRemoveVoucher}
                                            className="btn btn-danger"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </div> */}
                                <form action="/payment" method="GET">
                                {dataCart.length === 0 && (
                                <div className="alert alert-warning text-center mt-4">
                                    Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm để tiếp tục thanh toán.
                                </div>
                                )}
                                <button
                                    type="submit"
                                    className="btn btn-outline-danger"
                                    style={{ padding: '10px 20px', fontSize: '15px', width: '100%', borderRadius: '5px' }}
                                    disabled={dataCart.length === 0} // Nút bị vô hiệu hóa nếu giỏ hàng trống
                                >
                                    Tiến hành thanh toán
                                </button>
                            </form>


                               
                            </div>
                        </div>
                    </div>
                </div>

           
            </section>
        </div>
    )
}

export default Cart;