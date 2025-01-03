import { useNavigate } from 'react-router-dom';
import videoIntro from '../../assets/video-homepage.mp4'
import { useSelector } from 'react-redux';
import {getProduct} from '../../services/apiService.js'
import { useEffect, useState } from "react";
import banner from '../../assets/banner.jpg'
import banner1 from '../../assets/banner1.jpg'
import { IoCart } from "react-icons/io5";

const HomePage=()=>{
    const isAuthenticated= useSelector( state=> state.user.isAuthenticated);
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
    return (
        <div className="homepage-container">

            <video autoPlay muted loop>
                <source 
                    src={videoIntro}
                    type="video/mp4"/>
            </video>
            <div className="homepage-content">
                <div className="title-content-1">DragonBall  & One Piece</div>
                <div className="title-content-2">
                    <img src={banner} alt="" />
                    <img src={banner1} alt="" />


                </div>
                <div className="title-content-3">

                </div>
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
             </div>
        </div>
    )
}

export default HomePage;