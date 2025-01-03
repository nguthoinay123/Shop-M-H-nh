export const INCREMENT = 'INCREMENT';

export const DECREMENT = 'DECREMENT';
export const LOGOUT = 'LOGOUT';

export const increaseCounter = () => {
    return {
        type: INCREMENT,
    };
};

export const decreaseCounter = () => {
    return {
        type: DECREMENT,
    };
};

export const logout = () => {
    return {
        type: LOGOUT, // Đây là action sẽ được gọi khi người dùng logout
    };
};
