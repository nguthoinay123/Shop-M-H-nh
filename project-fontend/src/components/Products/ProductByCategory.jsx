import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getProductbyCategory } from '../../services/apiService';
import './ProductByCategory.scss'
import { IoCart } from "react-icons/io5";
import { getCategory } from "../../services/apiService";
import { toast } from 'react-toastify';
import { postAddToCart } from '../../services/apiService.js';

const ProductByCategory = (props) => {
    const [productByCategory, setProductByCategory] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { slug } = useParams(); 
    const [currentCategory, setCurrentCategory] = useState(null); // Lưu category hiện tại
    const [quantity, setQuantity] = useState(1);  // Số lượng sản phẩm muốn thêm

    useEffect(() => {
         getDataProductByCategory(slug);
         getDataCategory();
    }, [slug]); 

    const getDataProductByCategory = async (slug) => {
        const res = await getProductbyCategory(slug); 
        if (res && res.EC === 0) { 
            setProductByCategory(res.DT);
        }
    };

    const getDataCategory = async () => {
        const res = await getCategory();
        if (res && res.EC === 0) {
            const category = res.DT.find((cat) => cat.slug === slug);
            setCurrentCategory(category || null);
        }
    };
    const handleAddToCart=async(product_id)=>{
        const res = await postAddToCart(product_id, quantity,);
        if(res && res.EC===0){
            toast.success(res.EM)
          }
          if(res && res.EC!==0){
            toast.error(res.EM)
          }
    }

    return (
        <div>
            <div className="banner-h2 d-flex justify-content-center text-center text-title">
                <h2 className="text-uppercase text-dominant">
                    {currentCategory ? `Mô Hình ${currentCategory.name}` : "Mô Hình"}
                </h2>
            </div>

            <div className="banner-h5 d-flex justify-content-center">
                <p className="text-secondary">Trang chủ / Sản phẩm</p>
            </div>

            <div className="product-by-category container">  
                {productByCategory && productByCategory.length > 0 &&
                    productByCategory.map((item, index) => (
                        <div key={`${index}-product`} className="card" style={{ width: "15rem" }}>
                            <button onClick={() => handleAddToCart(item.id)} className="btn-addtocart"> <IoCart /></button>     
                            <img src={item.image} alt={item.name} />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.price}</p>
                            </div>
                            <button onClick={() => navigate(`/product/detail/${item.slug}`)} className="btn-detail text-white fw-bold">Chi Tiết</button>
                        </div>
                    ))
                }
                {productByCategory && productByCategory.length === 0 &&
                    <div>
                        Bạn không có sản phẩm nào trong danh mục này.
                    </div>
                }
            </div>
        </div>
    );
};

export default ProductByCategory;
