<?php

namespace Examples;

use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * ページネーションなしで全ユーザーを取得する
     */
    public function get(): \Illuminate\Http\JsonResponse
    {
        return response()->json(['data' => User::all(['id', 'name'])]);
    }

    /**
     * ユーザーを取得する
     */
    public function find(int $id): \Illuminate\Http\JsonResponse
    {
        $user = User::find($id, ['id', 'name']);

        return response()->json(['data' => $user]);
    }

    /**
     * ユーザーを作成する
     */
    public function create(StoreUserRequest $request): \Illuminate\Http\JsonResponse
    {
        $created = User::query()
            ->create($request->all())
            ->only(['id', 'name']);

        return response()->json(['data' => $created]);
    }

    /**
     * ユーザーを更新する
     */
    public function update(UpdateUserRequest $request, int $id): \Illuminate\Http\JsonResponse
    {
        $user = User::find($id, ['id', 'name']);

        if (is_null($user)) {
            return response()->json(['data' => null]);
        }

        $user->update($request->all());

        return response()->json(['data' => $user->only(['id', 'name'])]);
    }

    /**
     * ユーザーを削除する
     */
    public function delete(int $id): \Illuminate\Http\JsonResponse
    {
        $user = User::find($id, ['id', 'name']);

        if (! is_null($user)) {
            $user->delete();
        }

        return response()->json(['data' => null]);
    }
}
