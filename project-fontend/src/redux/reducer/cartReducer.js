// import { ADD_TO_CART, REMOVE_FROM_CART } from '../action/cartAction';

// const INITIAL_STATE = {
//     products: null, // Chỉ giữ một sản phẩm trong giỏ hàng (null nếu không có sản phẩm)
//     productCount: 0,  // Tổng số sản phẩm trong giỏ hàng
// };

// const cartReducer = (state = INITIAL_STATE, action) => {
//     switch (action.type) {
//         case ADD_TO_CART:
//             const { product_id, quantity } = action.payload.DT;

//             if (state.products === null) {
//                 // Nếu giỏ hàng chưa có sản phẩm, thêm sản phẩm đầu tiên vào
//                 return {
//                     ...state,
//                     products: {
//                         product_id,
//                         quantity,
//                     },
//                     productCount: quantity, // Cập nhật số lượng sản phẩm
//                 };
//             }

//             // Nếu sản phẩm đã có trong giỏ, chỉ cần tăng số lượng của nó
//             if (state.products.product_id === product_id) {
//                 return {
//                     ...state,
//                     products: {
//                         ...state.products,
//                         quantity: state.products.quantity + quantity,  // Tăng số lượng của sản phẩm
//                     },
//                     productCount: state.productCount + quantity, // Cập nhật tổng số sản phẩm
//                 };
//             }

//             // Nếu sản phẩm khác, có thể bỏ qua hoặc thay thế sản phẩm cũ với sản phẩm mới
//             // (Tùy thuộc vào yêu cầu của bạn)
//             return {
//                 ...state,
//                 products: {
//                     product_id,
//                     quantity,
//                 },
//                 productCount: quantity, // Cập nhật số lượng sản phẩm
//             };

//         case REMOVE_FROM_CART:
//             // Xóa sản phẩm khỏi giỏ hàng
//             return {
//                 ...state,
//                 products: null, // Giỏ hàng trống sau khi xóa
//                 productCount: 0, // Cập nhật lại số lượng sản phẩm
//             };

//         default:
//             return state;
//     }
// };

// export default cartReducer;
