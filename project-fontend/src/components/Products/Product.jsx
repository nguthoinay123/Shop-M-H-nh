import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProduct } from "../../services/apiService";
import './product.scss'
import { IoCart } from "react-icons/io5";
import { toast } from 'react-toastify';
import { postAddToCart } from '../../services/apiService.js';

const Product=(props)=>{
    const [products, setProducts]=useState([]);
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);  // Số lượng sản phẩm muốn thêm

    useEffect(()=>{
        getDataProduct();
    },[]);
    const getDataProduct=async()=>{
        const res=await getProduct();
        if(res && res.EC===0){ 
            setProducts(res.DT)
        }
    }
    const handleAddToCart=async(product_id)=>{
        const res = await postAddToCart(product_id, quantity,);
        if(res && res.EC===0){
            toast.success(res.EM)
          }
          if(res && res.EC!==0){
            toast.error(res.EM)
          }
    }

    return(
        <div>
            <div className="banner-h2 d-flex justify-content-center text-center text-title">
                    <h2 className="text-uppercase text-dominant">Tất Cả Mô Hình</h2>
                </div>

                <div className="banner-h5 d-flex justify-content-center">
                    <p className="text-secondary">Trang chủ / Sản phẩm</p>
                </div>
     
       <div className="product-container container">  
            
            {products && products.length >0 &&
                products.map((item,index)=>{
                    return (
                        <div key={`${index}-product`} className="card" style={{width: "15rem"}}>
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
            {products&&products.length=== 0 &&
                <div>
                    you don't have any product
                </div>
            }

           
        </div>
        </div>
    )
}
export default Product;