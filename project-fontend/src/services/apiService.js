import axios from "../utils/axiosCustomize";

const postLogin=(email, password, )=>{
    return axios.post(`api/v1/login`,{email, password,delay:3000});

}
const postSignup=(email, password, name,repassword)=>{
    return axios.post(`/api/v1/register`,{email, password,name,repassword});
}
const getProduct=()=>{
    return axios.get('api/v1/products')
}
const getCategory=()=>{
      return axios.get('api/v1/category')
}
const getProductbyCategory = (slug) => {
  return axios.get(`api/v1/category/${slug}`);
}
const getProductDetail = (slug) => {
  return axios.get(`api/v1/product/detail/${slug}`);
}
const getCart=()=>{
    return axios.get('api/v1/cart')
}
const postAddToCart=(product_id,quantity)=>{
    return axios.post(`api/v1/cart/add-to-cart`,{product_id,quantity})
}
const patchCartUpdate=(product_id,quantity)=>{
    return axios.patch(`api/v1/cart/update/${product_id}`,{quantity})
}
const DeleteCart=(product_id)=>{
    return axios.delete(`api/v1/cart/remove/${product_id}`)
}
const getUserProfile=()=>{
    return axios.get('api/v1/user/profile')
}
const postUpdateProfile=(updatedData)=>{
    return axios.post(`api/v1/user/update`,updatedData)
}
const getPayment=()=>{
    return axios.get('api/v1/payment')
}
const postProcessPayment=(payload)=>{
    return axios.post(`api/v1/payment/process`,payload)
}

export {postLogin, postSignup, getProduct, getCategory, getProductbyCategory, getProductDetail, getCart, postAddToCart, patchCartUpdate, DeleteCart, getUserProfile, postUpdateProfile, getPayment, postProcessPayment}