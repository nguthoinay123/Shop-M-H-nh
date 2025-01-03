import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProduct } from "../../services/apiService";
import './product.scss'
import { IoCart } from "react-icons/io5";

const Product=()=>{
    const [products, setProducts]=useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        getDataProduct();
    },[]);
    const getDataProduct=async()=>{
        const res=await getProduct();
        if(res && res.EC===0){ 
            setProducts(res.DT)
        }
    }
    

    return(
        <div>
        <div className="text-center" >
            Tất Cả Mô Hình
        </div>

       <div className="product-container container">  
            
            {products && products.length >0 &&
                products.map((item,index)=>{
                    return (
                        <div key={`${index}-product`} className="card" style={{width: "15rem"}}>
                            <button className="btn-addtocart"> <IoCart/></button>
                                <img 
                                src={item.image}  
                                style={{ borderRadius: "5px" }}/>
                            <div className="card-body">
                                <h5 className="card-title text-danger">{item.name}</h5>
                                <p className="card-text">{item.price} VNĐ</p>
                            </div>
                            <button className="btn-detail">Chi Tiết</button>

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