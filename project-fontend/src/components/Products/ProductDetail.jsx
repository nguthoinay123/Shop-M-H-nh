import { useEffect, useState } from "react";
import { getProductDetail } from "../../services/apiService";
import { useParams } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import './ProductDetail.scss'
import { toast } from 'react-toastify';
import { postAddToCart } from '../../services/apiService.js';

const ProductDetail = (props) => {
    const { slug } = useParams();
    const [productDetail, setProductDetail] = useState(); 
    const [relatedProduct, setRelatedProduct] = useState([]); 
    const navigate= useNavigate();
    const [quantity, setQuantity] = useState(1);  // Số lượng sản phẩm muốn thêm

    useEffect(() => {
        getDataProductDetail(slug);
        getDataRelatedProduct(slug)
    }, [slug]);

    const getDataProductDetail = async (slug) => {
        const res = await getProductDetail(slug);
        if (res && res.EC === 0) {
            setProductDetail(res.DT.PDT); 
        }
    };
     const getDataRelatedProduct = async () => {
        const res = await getProductDetail(slug);
        if (res && res.EC === 0) {
            setRelatedProduct(res.DT.RLP); 
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
        <div className="product-detail-container container">
            <div className="product-detail">
                {productDetail && (
                    <div className="product-detail-content">
                        <div className="card-detail">
                            <img
                                src={productDetail.image} 
                                
                            />
                           
                        </div>
                        <div className="product-detail-body fw-bold">
                            <h5 className="card-title text-danger">Tên: {productDetail.name}</h5>
                            <p className="card-text text-warning mt-3">Giá: {productDetail.price.toLocaleString('vi-VN')} VNĐ</p>
                            <p className="card-text">Mô tả: {productDetail.description}</p>
                            <p className="card-text">Hàng còn: 
                                <span className="text-danger">  {productDetail.instock}</span>
                            </p>
                             <button onClick={() => handleAddToCart(productDetail.id)} className="btn btn-primary btn-addtocart">
                                <IoCart /> Thêm Giỏ hàng
                            </button>
                        </div>
                    </div>
                )}
                {productDetail && productDetail.length === 0 && (
                    <div>
                        You don't have any product detail
                    </div>
                )}
            </div>

            <div className="related-product">
                {relatedProduct && relatedProduct.length >0 &&
                    relatedProduct.map((item,index)=>{
                        return (
                            <div key={`${index}-product`} className="card card-related" style={{width: "15rem"}}>
                                <button onClick={() => handleAddToCart(item.id)} className="btn-addtocart"> <IoCart/></button>
                                    <img 
                                    src={item.image}  
                                    style={{ borderRadius: "5px" }}/>
                                <div className="card-body">
                                    <h5 className="card-title text-danger">{item.name}</h5>
                                    <p className="card-text">{item.price.toLocaleString('vi-VN')} VNĐ</p>
                                </div>
                                <button onClick={() => navigate(`/product/detail/${item.slug}`)} className="btn-detail text-white fw-bold">Chi Tiết</button>

                            </div>
                        )
                    })
                }
                {relatedProduct&&relatedProduct.length=== 0 &&
                    <div>
                        you don't have any related product
                    </div>
                }
            </div>
        </div>
    );
};

export default ProductDetail;
