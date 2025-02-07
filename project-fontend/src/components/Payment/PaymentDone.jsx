const PaymentDone =()=>{
    return (
        <main>
            <section className="banner-gioithieu-1 pb-5">
                <div className="banner-h2 d-flex justify-content-center">
                    <div
                        className="d-flex flex-column justify-content-center align-items-center"
                        style={{ marginTop: "70px" }}
                    >
                        <i
                            className="fa-regular fa-circle-check text-success"
                            style={{ fontSize: "100px" }}
                        ></i>
                        <h1 className="text-success mt-3">ĐẶT HÀNG THÀNH CÔNG</h1>
                        <p>
                            "Đơn hàng của bạn đã được đặt thành công! Chúng tôi sẽ sớm xử lý và giao
                            hàng cho bạn. Cảm ơn bạn đã tin tưởng và mua sắm tại Yến Tâm!"
                        </p>
                        {/* <div className="d-flex">
                            <Link to="/products" className="btn btn-link text-secondary" style={{ textDecoration: "none" }}>
                                &larr; Tiếp tục mua hàng
                            </Link>
                        </div> */}
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    <img
                        src="/image/banner/bannerthanhtoanthanhcong.png"
                        style={{ maxWidth: "700px", paddingRight: "80px" }}
                        alt="Banner"
                    />
                </div>

                <div className="container text-center">
                    <h5>CÁC SẢN PHẨM BÁN CHẠY</h5>
                    {/* <div className="row">
                        {productsBestSeller.map((item) => (
                            <Link
                                key={item.slug}
                                to={`/detail/${item.slug}`}
                                className="text-decoration-none text-dark col-md-3 mt-4"
                            >
                                <div className="card product-card p-0 bg-light">
                                    <img
                                        src={`/image/products/${item.image}`}
                                        className="card-img-top"
                                        alt={item.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title fs-6">{item.name}</h5>
                                        <p style={{ fontSize: "12px" }} className="card-text">
                                            {item.des}
                                        </p>
                                        <h5 className="card-text text-warning">
                                            {Number(item.price).toLocaleString("vi-VN")} đ
                                        </h5>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div> */}
                </div>
            </section>
        </main>
    )
}
export default PaymentDone;