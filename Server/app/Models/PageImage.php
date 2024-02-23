<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Pages;

class PageImage extends Model{
    use HasFactory;
    const CREATED_AT = 'fldDateCreated';
    const UPDATED_AT = 'fldDateUpdated';
    protected $table = 'tblpageimages';
    protected $primaryKey = 'fldPageImgID';
    protected $fillable = ['fldPageImgID','fldImageTitle', 'fldImage','fldBannerImage','fldPage_ID'];
    public function Page()
    {
        return $this->belongsTo(Pages::class,'fldPage_ID','fldPageID');
    }
}
