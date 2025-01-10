export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS'
export const LOGOUT = 'LOGOUT';
export const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS';  // Lấy giỏ hàng từ DB

export const doLogin=(data,res)=>{
    return {
        type:FETCH_USER_LOGIN_SUCCESS,
        payload: data,
    

    }
}
export const logout = () => {
    return {
        type: LOGOUT,
    };
};
