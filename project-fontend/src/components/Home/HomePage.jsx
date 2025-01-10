import { useNavigate, Link, useParams } from 'react-router-dom';
// import videoIntro from '../../assets/video-homepage.mp4'
import { useSelector, useDispatch } from 'react-redux';
import {getProduct} from '../../services/apiService.js'
import { useEffect, useState } from "react";
import banner from '../../assets/banner.jpg'
import banner1 from '../../assets/banner1.jpg'
import { IoCart } from "react-icons/io5";
import { getCategory } from "../../services/apiService";
import { toast } from 'react-toastify';
import { postAddToCart } from '../../services/apiService.js';
// import { addToCart } from '../../redux/action/cartAction.js';

const HomePage=(prop)=>{
    const isAuthenticated= useSelector( state=> state.user.isAuthenticated);
    const [products, setProducts]=useState([]);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [quantity, setQuantity] = useState(1);  // Số lượng sản phẩm muốn thêm
    const dispatch = useDispatch();

    useEffect(()=>{
        getDataProduct();
        getDataCategory();
    },[]);
    const getDataProduct=async()=>{
        const res=await getProduct();
        if(res && res.EC===0){ 
            setProducts(res.DT)
        }
    };
      const getDataCategory = async () => {
        const res = await getCategory();
        if (res && res.EC === 0) {
        setCategories(res.DT);
        }
    };
    const handleAddToCart=async(product_id)=>{
        const res = await postAddToCart(product_id, quantity,);
        if(res && res.EC===0){
            // dispatch(addToCart(res))
            toast.success(res.EM)
          }
          if(res && res.EC!==0){
            toast.error(res.EM)
          }
    }
    return (
        <div className="homepage-container">

            {/* <video autoPlay muted loop>
                <source 
                    src={videoIntro}
                    type="video/mp4"/>
            </video> */}
            <div className="homepage-content">
                <div className="title-content-1">DragonBall  & One Piece</div>
                <div className="title-content-2">
                    <img src={banner} alt="" />
                    <img src={banner1} alt="" />


                </div>
                <div className="title-content-3">

                </div>
            </div>
            <div className='category-container container'>
                {categories && categories.length > 0 &&
                    categories.map((item, index) => (
                    <ul  key={`${index}-category`}>
                    <li onClick={() => navigate(`/category/${item.slug}`)}>
                        <img  src={item.image} alt="" />
                        <p >{item.name}</p>
                    </li>
                    <span className="underline"></span>
                    </ul>

                   ))
              }
            </div>
            <div className="product-container container">  
                        {products && products.length >0 &&
                                        products.map((item,index)=>{
                                            return (
                                                <div key={`${index}-product`} className="card" style={{width: "15rem"}}>
                                                    <button  onClick={() => handleAddToCart(item.id)} className="btn-addtocart"> <IoCart/></button>
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
             </div>
        </div>
    )
}

export default HomePage;