import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductbyCategory } from '../../services/apiService';
import './ProductByCategory.scss'
import Header from "../header/header";
const ProductByCategory = (props) => {
    const [productByCategory, setProductByCategory] = useState([]);
    const navigate = useNavigate();
    const { slug } = useParams(); // Lấy slug từ URL

    useEffect(() => {
        if (slug) {
            getDataProductByCategory();
        }
    }, [slug]); // Gọi lại khi slug thay đổi

    const getDataProductByCategory = async () => {
        const res = await getProductbyCategory(slug); // Truyền slug vào API
        console.log('check', res);
        if (res && res.EC === 0) { 
            setProductByCategory(res.DT);
        } else {
            setProductByCategory([]); // Nếu không có sản phẩm, gán mảng rỗng
        }
    };

    return (
        <div>

        <Header/>
        <div className="product-by-category container">  
            {productByCategory && productByCategory.length >0 &&
                productByCategory.map((item,index)=>{
                    return (
                        <div key={`${index}-product`} className="card" style={{width: "15rem"}}>
                            {/* <img src={`data:image/jpeg;base64,${item.image}`} className="card-img-top" alt="..."/> */}
                            <img src={item.image}  />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.price}</p>
                                {/* <button onClick={()=>navigate(`/quiz/${item.id}`,{state:{ quiztitle: item.description}})} className="btn btn-primary">Start Now</button> */}
                            </div>
                        </div>
                    )
                })
            }
            {productByCategory&&productByCategory.length=== 0 &&
                <div>
                    you don't have any product
                </div>
            }

           
        </div>
                    
        </div>
    );
};

export default ProductByCategory;
