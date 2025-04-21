<?php

Route::prefix('examples')->group(function () {
    Route::prefix('users')->group(function () {
        Route::get('/', [\Examples\UserController::class, 'get']);
        Route::get('/{id}', [\Examples\UserController::class, 'find']);
        Route::post('/', [\Examples\UserController::class, 'create']);
        Route::put('/{id}', [\Examples\UserController::class, 'update']);
        Route::delete('/{id}', [\Examples\UserController::class, 'delete']);
    });
});
