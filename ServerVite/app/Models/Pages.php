<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pages extends Model{
    use HasFactory;
    const CREATED_AT = 'fldDateCreated';
    const UPDATED_AT = 'fldDateUpdated';
    protected $table = 'tblpages';
    protected $primaryKey = 'fldPageID';
    protected $fillable = ['fldTitle', 'fldDesc','fldStatus','fldImage'];
}
