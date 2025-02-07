<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator; // Thêm dòng này vào đầu file
use Illuminate\Support\Facades\Hash; 
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;


class AuthController extends Controller
{

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

        // Tạo Access Token với claims đầy đủ
        $payload = [
            'sub' => $user->id,                 // Subject của token
            'email' => $user->email,            // Thông tin người dùng
            'iat' => time(),                    // Thời gian phát hành
            'exp' => time() + 60 * 60 * 24,     // Thời gian hết hạn (24 giờ)
        ];

        $accessToken = JWT::encode(
            $payload,
            env('JWT_SECRET'),                  // Khóa bí mật từ .env
            'HS256'                             // Thuật toán mã hóa
        );

        return response()->json([
            'DT' => [
                'access_token' => $accessToken,
                'user' => $user
            ],
            'EC' => 0,
            'EM' => "Login succeed"
        ], 200);
    } catch (\Throwable $th) {
        if ($th instanceof ValidationException) {
            return response()->json([
                'EM' => $th->getMessage()
            ], 400);
        }
        return response()->json([
            'EM' => $th->getMessage()
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

public function logout(Request $request)
{
    try {
        // Lấy token từ header Authorization
        $token = $request->bearerToken();

        if ($token) {
            // Thực tế, không cần xóa gì ở server vì JWT là stateless.
            // Bạn chỉ cần thông báo cho client rằng đăng xuất thành công.

            return response()->json([
                'EM' => 'Logout successful',
                'EC' => 0,
                'DT' => ''
            ], 200);
        }

        return response()->json([
            'EM' => 'Token not provided',
            'EC' => 1,
            'DT' => ''
        ], 400);

    } catch (\Exception $e) {
        return response()->json([
            'EM' => 'Unexpected error: ' . $e->getMessage(),
            'EC' => 1,
            'DT' => '',
        ], 500);
    }
}
    public function profile(Request $request){
    try {
        // Lấy token từ header Authorization
        $authHeader = $request->header('Authorization');
        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return response()->json([
                'EM' => 'Unauthorized: Token không được cung cấp',
                'EC' => 1,
                'DT' => ''
            ], 401);
        }

        // Giải mã token
        $token = str_replace('Bearer ', '', $authHeader);
        try {
            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        } catch (\Exception $e) {
            return response()->json([
                'EM' => 'Unauthorized: Token không hợp lệ hoặc hết hạn',
                'EC' => 1,
                'DT' => ''
            ], 401);
        }

        // Kiểm tra payload
        if (!isset($decoded->sub)) {
            return response()->json([
                'EM' => 'Invalid token payload',
                'EC' => 1,
                'DT' => ''
            ], 401);
        }

        // Lấy thông tin user
        $userId = $decoded->sub;
        $user = User::find($userId);
        if (!$user) {
            return response()->json([
                'EM' => 'Unauthorized: Người dùng không hợp lệ',
                'EC' => 1,
                'DT' => ''
            ], 401);
        }

        // Trả về thông tin user (ẩn các trường nhạy cảm)
        $userData = $user->only(['id', 'name', 'email', 'image', 'phone', 'address']);
        return response()->json([
            'EM' => 'get user information success',
            'EC' => 0,
            'DT' => $userData
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'EM' => 'Server error: ' . $e->getMessage(),
            'EC' => 2,
            'DT' => ''
        ], 500);
    }
}
    public function updateprofile(Request $request)
{
    try {
        // Lấy token từ header Authorization
        $authHeader = $request->header('Authorization');
        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return response()->json([
                'EM' => 'Unauthorized: Token không được cung cấp',
                'EC' => 1,
                'DT' => ''
            ], 401);
        }

        // Giải mã token
        $token = str_replace('Bearer ', '', $authHeader);
        try {
            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        } catch (\Exception $e) {
            return response()->json([
                'EM' => 'Unauthorized: Token không hợp lệ hoặc hết hạn',
                'EC' => 1,
                'DT' => ''
            ], 401);
        }

        // Kiểm tra payload
        if (!isset($decoded->sub)) {
            return response()->json([
                'EM' => 'Invalid token payload',
                'EC' => 1,
                'DT' => ''
            ], 401);
        }

        // Lấy thông tin user
        $userId = $decoded->sub;
        $user = User::find($userId);
        if (!$user) {
            return response()->json([
                'EM' => 'Unauthorized: Người dùng không hợp lệ',
                'EC' => 1,
                'DT' => ''
            ], 401);
        }

        // Validate input dữ liệu cập nhật
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'address' => 'required|string|max:255',  // Có thể thêm các trường khác như email, địa chỉ, ...
   // Có thể thêm các trường khác như email, địa chỉ, ...
            // Thêm các trường khác nếu cần
        ]);

        // Cập nhật thông tin người dùng
        $user->name = $request->name;  // Cập nhật tên người dùng
        $user->phone = $request->phone;  // Cập nhật tên người dùng
        // Nếu có thêm trường khác cần cập nhật thì cũng gán tương tự
        // $user->email = $request->email; // Ví dụ cập nhật email
        $user->address = $request->address; // Cập nhật địa chỉ

        $user->save(); // Lưu thông tin đã cập nhật

        return response()->json([
            'EM' => 'Cập nhật thông tin thành công',
            'EC' => 0,
            'DT' => $user
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'EM' => 'Server error: ' . $e->getMessage(),
            'EC' => 2,
            'DT' => ''
        ], 500);
    }
}

}