import { FETCH_USER_LOGIN_SUCCESS, LOGOUT } from '../action/userAction';

const INITIAL_STATE = {
    account:{
        access_token:'',
        refresh_token:'',
        name:'',
        image:'',
        role:'',
    },
    isAuthenticated : false,
    
    
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            // console.log('check action',action)
            return {
                ...state, account:{
                    access_token: action?.payload?.DT?.access_token,
                    refresh_token: action?.payload?.DT?.user?.refresh_token,
                    name: action?.payload?.DT?.user?.name,
                    image:  action?.payload?.DT?.user?.image,
                    role: action?.payload?.DT?.user?.role,
                },
                isAuthenticated:true,
                // cart: action.payload.cart, // Cập nhật giỏ hàng từ DB

            };
        case LOGOUT: // Khi logout
            return {
                 ...INITIAL_STATE, // Reset tất cả thông tin về người dùng và giỏ hàng

            };

       
        default: return state;
    }
    
};


export default userReducer;