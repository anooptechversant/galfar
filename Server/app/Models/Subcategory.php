<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;

class SubCategory extends Model{
    use HasFactory;
    const CREATED_AT = 'fldCreated_date';
    const UPDATED_AT = 'fldupdated_date';
    protected $table = 'tblsubcategories';
    protected $primaryKey = 'fldSubCategoryID';
    protected $fillable = ['fldTitle', 'fldDescription','fldStatus','fldCategory_ID','fldLink'];
    public function Category()
    {
        return $this->belongsTo(Category::class,'fldCategory_ID','fldCategoryID');
    }
}
