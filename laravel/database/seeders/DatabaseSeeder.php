<?php

namespace Database\Seeders;

use Examples;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            Examples\UserSeeder::class,
        ]);
    }
}
