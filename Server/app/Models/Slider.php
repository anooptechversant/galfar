<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\SliderVersions;

class Slider extends Model{
    use HasFactory;
    const CREATED_AT = 'fldCreatedDate';
    const UPDATED_AT = 'fldupdatedDate';
    protected $table = 'tblsliders';
    protected $primaryKey = 'fldSliderID';
    protected $fillable = [
        'fldTitle',
        'fldTitleArab',
        'fldDescription',
        'fldDescriptionArab',
        'fldStatus',
        'fldLink',
        'fldVersion',
        'fldMainSliderID'
    ];
    public function SliderImage()
    {
        return $this->hasMany(SliderImage::class,'fldSlider_ID','fldSliderID');
    }
    public function SliderImageOne()
    {
        return $this->hasOne(SliderImage::class,'fldSlider_ID','fldSliderID');
    }
    public function SliderVersions()
    {
        return $this->hasOne(SliderVersions::class,'fldSlider_ID','fldSliderID');
    }
}
