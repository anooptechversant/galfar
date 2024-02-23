<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\SliderImage;

class Slider extends Model{
    use HasFactory;
    const CREATED_AT = 'fldCreatedDate';
    const UPDATED_AT = 'fldupdatedDate';
    protected $table = 'tblSliders';
    protected $primaryKey = 'fldSliderID';
    protected $fillable = ['fldTitle', 'fldDescription','fldStatus','fldLink'];
    public function SliderImage()
    {
        return $this->hasMany(SliderImage::class,'fldSlider_ID','fldSliderID');
    }
}
