<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\NewsImage;

class News extends Model{
    use HasFactory;
    const CREATED_AT = 'fldDateCreated';
    const UPDATED_AT = 'fldDateUpdated';
    protected $table = 'tblnews';
    protected $primaryKey = 'fldNewsID';
    protected $fillable = ['fldTitle','fldTitleArab', 'fldDescription','fldDescriptionArab','fldStatus'];
    public function NewsImage()
    {
        return $this->hasMany(NewsImage::class,'fldNews_ID','fldNewsID');
    }
}
