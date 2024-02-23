<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model{
    use HasFactory;
    protected $table = 'tblCategories';
    protected $fillable = ['fldTitle', 'fldDescription','fldStatus','fldCategoryID'];
}
