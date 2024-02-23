<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\SubCategory;

class CommonCategoryController extends Controller
{
    public function index (){
        $categoryList = Category::get();
        $categoryLists = [];
        foreach ($categoryList as $item){
            $subCategoryArray = [];
            $subCategory = $item->SubCategory;
            foreach ($subCategory as $itemI){
                $subCategoryArray[] = [
                    'CategoryID' => $itemI->fldCategory_ID,
                    'title' => $itemI->fldTitle,
                    'desc' => $itemI->fldDescription,
                    'link' => $itemI->fldLink
                ];
            }
            $categoryLists[] = [
                'id' => $item->fldCategoryID,
                'link' => $item->fldLink,
                'category' => $item->fldTitle,
                'subcategories' => $subCategoryArray
            ];
        }
        return response()->json([
            'status' => 'success',
            'data' => $categoryLists,
        ]);
    }
}
