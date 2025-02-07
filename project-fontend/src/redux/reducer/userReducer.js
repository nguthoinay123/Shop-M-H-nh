import { FETCH_USER_LOGIN_SUCCESS, UPDATE_USER_PROFILE, LOGOUT } from '../action/userAction';

const INITIAL_STATE = {
    account:{
        access_token:'',
        refresh_token:'',
        name:'',
        image:'',
        role:'',
        phone:'',
    },
    isAuthenticated : false,
    
    
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            return {
                ...state, account:{
                    access_token: action?.payload?.DT?.access_token,
                    refresh_token: action?.payload?.DT?.user?.refresh_token,
                    name: action?.payload?.DT?.user?.name,
                    image:  action?.payload?.DT?.user?.image,
                    role: action?.payload?.DT?.user?.role,
                    phone: action?.payload?.DT?.user?.phone,
                    address: action?.payload?.DT?.user?.address,

                },
                isAuthenticated:true,
                // cart: action.payload.cart, // Cập nhật giỏ hàng từ DB

            };
        case LOGOUT: // Khi logout
            return {
                 ...INITIAL_STATE, // Reset tất cả thông tin về người dùng và giỏ hàng

            };
        case UPDATE_USER_PROFILE:
                return {
                    ...state,
                    account: {
                        ...state.account,
                        name: action.payload.name || state.account.name,
                        phone: action.payload.phone || state.account.phone,
                        address: action.payload.address || state.account.address,
                    },
                };


       
        default: return state;
    }
    
};


export default userReducer;