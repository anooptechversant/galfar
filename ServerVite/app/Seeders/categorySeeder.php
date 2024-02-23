<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class categorySeeder extends Seeder
{
    /**
     * Run the database seeders.
     */
    public function run(): void
    {
        DB::table('tblCategories')->insert([
            'fldTitle' => Str::random(10),
            'fldStatus' => Str::random(10),
            'fldDescription' => Str::random(10),
        ]);
    }
}
