<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator; // Thêm dòng này vào đầu file
use Illuminate\Support\Facades\Hash; 
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Firebase\JWT\JWT;



class AuthController extends Controller
{
    /** 
     * Login the user
    *@param Request
    *@return User
    */

public function login()
{
    try {
        // Xác thực yêu cầu
        request()->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Tìm người dùng trong cơ sở dữ liệu
        $user = User::where('email', request('email'))->first();

        // Kiểm tra xem người dùng có tồn tại không
        if (!$user) {
            return response()->json([
                'EM' => 'Email không tồn tại',
                'EC' => 1,
                'DT' => ''
            ], 200);
        }

        // Kiểm tra mật khẩu có khớp không
        if (!Hash::check(request('password'), $user->password)) {
            return response()->json([
                'EM' => 'Mật khẩu không đúng',
                'EC' => 1,
                'DT' => ''
            ], 200);
        }

        // Tạo Access Token
        $accessToken = JWT::encode(
            ['user_id' => $user->id],   // Dữ liệu mà bạn muốn mã hóa vào token
            env('JWT_SECRET'),          // Khóa bí mật từ .env
            'HS256'                     // Thuật toán mã hóa
        );

        // Trả về thông tin người dùng và Access Token
        return response()->json([
            'DT' => [
                  'access_token' => $accessToken,
                'user' => $user
            ],
            'EC' => 0,
            'EM' => "Login succeed"
        ], 200);

    } catch(\Throwable $th){
            if($th instanceof ValidationException){
                return response()->json([
                    'EM'=> $th->getMessage()
                ], 400);
            }
            return response()->json([
                'EM'=> $th->getMessage()
            ], 500);
        }

}



    public function signup(){
    try {
        // Xác thực yêu cầu
        $data = request()->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',  // Kiểm tra email duy nhất
            'password' => 'required|min:6',
            'repassword' => 'required|same:password',

        ]);

        // Tạo người dùng mới
        $user = User::create($data);

        // Trả về phản hồi thành công
        return response()->json([
            'EM' => 'User created successfully',
            'DT' => $user,
            'EC' => 0
        ], 200); // 201 status code nếu bạn muốn chỉ ra là tài nguyên được tạo mới
    } catch (\Throwable $th) {
        // Kiểm tra nếu là lỗi xác thực
        if ($th instanceof ValidationException) {
            $errors = $th->errors(); // Lấy các lỗi xác thực

            // kiểm tra user name không được trống
            if (isset($errors['name']) && in_array('The name field is required.', $errors['name'])){
                return response()->json([
                    'EM' => 'Không được để trống họ và tên',
                    'EC' => 1,
                    'DT' => ''
                ], 400); // Trả về thông báo lỗi name không được để trống
            }
            }
            if (isset($errors['email']) && in_array('The email field is required.', $errors['email'])) {
                return response()->json([
                    'EM' => 'Email không được để trống',
                    'EC' => 1,
                    'DT' => ''
                ], 400); // Trả về thông báo lỗi email đã tồn tại
            }

            if (isset($errors['email']) && in_array('The email has already been taken.', $errors['email'])) {
                return response()->json([
                    'EM' => 'Email đã tồn tại',
                    'EC' => 1,
                    'DT' => ''
                ],  200); // Trả về thông báo lỗi email đã tồn tại
            }

           if (isset($errors['password'])) {
                return response()->json([
                    'EM' => 'Password không hợp lệ',
                    'EC' => 1,
                    'DT' => ''
                ], 200); // Trả về thông báo lỗi password không hợp lệ
            }

           // Kiểm tra lỗi email không đúng định dạng
            if (isset($errors['email']) && in_array('The email must be a valid email address.', $errors['email'])) {
                return response()->json([
                    'EM' => 'Email không đúng định dạng',
                    'EC' => 1,
                    'DT' => ''
                ], 200);
            }

            // Kiểm tra lỗi password và repassword không khớp
            if (isset($errors['repassword']) && in_array('The repassword field must match password.', $errors['repassword'])) {
                return response()->json([
                    'EM' => 'Mật khẩu và Xác nhận mật khẩu phải khớp.',
                    'EC' => 1,
                    'DT' => ''
                ], 200); // Trả về thông báo lỗi mật khẩu không trùng khớp
            }
            // Trả về các lỗi xác thực khác
            return response()->json([
                'EM' => $errors,
                'EC' => 1
            ], 401);
    

            // // Trường hợp lỗi không xác định
            // return response()->json([
            //     'EM' => $th->getMessage(),
            //     'EC' => 1
            // ], 500);
        }
    }
       
    public function logout(){
        try {
            request()->user()->currentAccessToken()->delete();
            return response()->json([
                'message'=>'logout success'
            ]);
        }catch (\Throwable $th){
            return response()->json([
                'errors'=> $th->getMessage()
            ], 500);  
        }
    }
}