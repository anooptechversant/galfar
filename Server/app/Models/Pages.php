<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\PageImage;
class Pages extends Model{
    use HasFactory;
    const CREATED_AT = 'fldDateCreated';
    const UPDATED_AT = 'fldDateUpdated';
    protected $table = 'tblpages';
    protected $primaryKey = 'fldPageID';
    protected $fillable = ['fldTitle','fldTitleArab', 'fldDesc','fldDescArab','fldStatus','fldImage'];
    public function PageImage()
    {
        return $this->hasMany(PageImage::class,'fldPage_ID','fldPageID');
    }
}

