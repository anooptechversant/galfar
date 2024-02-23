<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Slider;

class SliderImage extends Model{
    use HasFactory;
    const CREATED_AT = 'fldCreatedDate';
    const UPDATED_AT = 'fldupdatedDate';
    protected $table = 'tblsliderimages';
    protected $primaryKey = 'fldSliderImageID';
    protected $fillable = ['fldTitle', 'fldDescription','fldStatus','fldSlider_ID'];
    public function Slider()
    {
        return $this->belongsTo(Slider::class,'fldSlider_ID','fldSliderID');
    }
}
