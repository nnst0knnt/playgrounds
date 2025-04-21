<?php

namespace Examples;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /** @use HasFactory<UserFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    protected static function newFactory(): UserFactory
    {
        return UserFactory::new();
    }
}
