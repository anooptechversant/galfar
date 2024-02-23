<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Category;

class categoryController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api');
    }
    public function index (Request $request){
        $categoryList = Category::get();
        $categoryLists = [];
        foreach ($categoryList as $item){
            $categoryLists[] = [
                'id' => $item->fldCategoryID,
                'category' => $item->fldTitle
            ];
        }
        return response()->json([
            'status' => 'success',
            'data' => $categoryLists,
        ]);
    }
}
