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

export {postLogin, postSignup, getProduct, getCategory, getProductbyCategory}