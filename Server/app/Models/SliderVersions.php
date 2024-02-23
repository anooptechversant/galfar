<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Slider;

class SliderVersions extends Model{
    use HasFactory;
    const CREATED_AT = 'fldDateCreated';
    const UPDATED_AT = 'fldDateUpdated';
    protected $table = 'tblsliderversions';
    protected $primaryKey = 'fldSliderVersionID';
    protected $fillable = ['fldSlider_ID', 'fldMainSlider_ID','fldDateCreated'];
    public function Slider()
    {
        return $this->belongsTo(Slider::class,'fldSlider_ID','fldSliderID');
    }
}
