import { FETCH_USER_LOGIN_SUCCESS } from '../action/userAction';
import { INCREMENT, DECREMENT } from '../action/counterAction';
import { LOGOUT } from '../action/counterAction'

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
            console.log('check action',action)
            return {
                ...state, account:{
                    access_token: action?.payload?.DT?.access_token,
                    refresh_token: action?.payload?.DT?.user?.refresh_token,
                    name: action?.payload?.DT?.user?.name,
                    image:  action?.payload?.DT?.user?.image,
                    role: action?.payload?.DT?.user?.role,
                },
                isAuthenticated:true
            };
        case LOGOUT: // Khi logout
            return {
                ...state,
                account: {
                    access_token: '',
                    refresh_token: '',
                    name: '',
                    image: '',
                    role: '',
                },
                isAuthenticated: false,
            };

        case DECREMENT:
            return {
                ...state, count: state.count - 1,
            };
        default: return state;
    }
    
};


export default userReducer;