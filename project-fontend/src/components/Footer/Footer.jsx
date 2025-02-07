import './Foote.scss'
const Footer = () => {
  return (
      <div className="footer-content">
        <div className="row">
          <div className="col-md-4">
            <div className="text-center">
            </div>
           
            <div className="mt-5">
              <p><i className="fa-solid fa-location-dot"></i> Showroom: Công Viên Phần Mềm Quang Trung, Quận 12, TP. Hồ Chí Minh</p>
              <p><i className="fa-solid fa-phone"></i> 0867.675.940</p>
              <p><i className="fa-solid fa-envelope"></i> thaian@gmail.com</p>
              <p><i className="fa-solid fa-clock"></i> Thời gian làm việc: Thứ 2 – Thứ 6 từ 8h30 - 17h30</p>
            </div>
          </div>

          <div className="col-md-8 ps-md-5">
            <div className="col">
              <div className="row row-cols-md-6">
                <ul className="col-4 list-unstyled">
                  <li className="mb-2 fw-bold"><a className="text-decoration-none text-white" href="/">Trang chủ</a></li>
                  <li className="mb-2 fw-bold"><a className="text-decoration-none text-white" href="/about">Giới thiệu</a></li>
                  <li className="mb-2 fw-bold"><a className="text-decoration-none text-white" href="/policy">Chính sách</a></li>
                  <li className="mb-2 fw-bold"><a className="text-decoration-none text-white" href="/contact">Liên hệ</a></li>
                </ul>
                {/* Cột 2 */}
                <ul className="col-4 list-unstyled">
                  <li className="mb-3 fw-bold">Sản phẩm của Yến Tâm</li>
                  <li className="mb-2"><a className="text-decoration-none text-white" href="/">Yến tinh chế cao cấp</a></li>
                  <li className="mb-2"><a className="text-decoration-none text-white" href="/">Yến hồng</a></li>
                  <li className="mb-2"><a className="text-decoration-none text-white" href="/">Yến thô nguyên chất</a></li>
                  <li className="mb-2"><a className="text-decoration-none text-white" href="/">Yến đen</a></li>
                  <li className="mb-2"><a className="text-decoration-none text-white" href="/">Yến sào cao cấp</a></li>
                  <li className="mb-2"><a className="text-decoration-none text-white" href="/">Yến rút lông nguyên tổ</a></li>
                </ul>
                {/* Cột 3 */}
                <ul className="col-4 list-unstyled">
                  <li className="mb-3 fw-bold">Chính sách khách hàng</li>
                  <li className="mb-2"><a className="text-decoration-none text-white" href="/">Chính sách thanh toán</a></li>
                  <li className="mb-2"><a className="text-decoration-none text-white" href="/">Chính sách vận chuyển</a></li>
                  <li className="mb-2"><a className="text-decoration-none text-white" href="/">Chính sách bảo mật</a></li>
                  <li className="mb-2"><a className="text-decoration-none text-white" href="/">Chính sách đổi trả</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Footer;
