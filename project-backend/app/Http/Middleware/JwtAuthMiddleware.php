<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use App\Models\User;
use Exception;


class JwtAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
  
public function handle($request, Closure $next)
{
    $authHeader = $request->header('Authorization');

    if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
        return response()->json([
            'EM' => 'Unauthorized: Token không được cung cấp',
            'EC' => 1,
            'DT' => ''
        ], 401);
    }

    $token = str_replace('Bearer ', '', $authHeader);

    try {
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        $request->user = User::find($decoded->sub);

        if (!$request->user) {
            throw new Exception('User not found');
        }
    } catch (\Throwable $th) {
        return response()->json([
            'EM' => 'Unauthorized: Token không hợp lệ',
            'EC' => 1,
            'DT' => ''
        ], 401);
    }

    return $next($request);
}
}
