import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProduct } from "../../services/apiService";
import './product.scss'

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
       <div className="product-container container">  
            {products && products.length >0 &&
                products.map((item,index)=>{
                    return (
                        <div key={`${index}-product`} className="card" style={{width: "15rem"}}>
                            {/* <img src={`data:image/jpeg;base64,${item.image}`} className="card-img-top" alt="..."/> */}
                                <img 
                                src={item.image}  
                                style={{ borderRadius: "5px" }}/>
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.price}</p>
                                {/* <button onClick={()=>navigate(`/quiz/${item.id}`,{state:{ quiztitle: item.description}})} className="btn btn-primary">Start Now</button> */}
                            </div>
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
    )
}
export default Product;