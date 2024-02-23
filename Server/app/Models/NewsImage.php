<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\News;

class NewsImage extends Model{
    use HasFactory;
    const CREATED_AT = 'fldDateCreated';
    const UPDATED_AT = 'fldDateUpdated';
    protected $table = 'tblnewsimages';
    protected $primaryKey = 'fldNewsImgID';
    protected $fillable = ['fldImageTitle','fldImageTitleArab', 'fldImageDescription','fldImageDescriptionArab','fldStatus','fldNews_ID','fldImage'];
    public function News()
    {
        return $this->belongsTo(News::class,'fldNews_ID','fldNewsID');
    }
}
