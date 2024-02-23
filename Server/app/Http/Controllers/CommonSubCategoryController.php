<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subcategory;
use App\Models\Category;

class CommonSubCategoryController extends Controller
{
    public function index(Request $request)
    {
        $subCategoryList = subCategory::with('category')->get();
        //$category = $subCategoryList->category;
        $subCategoryLists = [];
        foreach ($subCategoryList as $item){
            $category = $item->category;
            $subCategoryLists[] = [
                'id' => $item->fldSubCategoryID,
                'categoryID' => $item->fldCategory_ID,
                'subCategory' => $item->fldTitle,
                'categoryName' =>  $category->fldTitle
            ];
        }
        return response()->json([
            'status' => 'success',
            'data' => $subCategoryLists,
        ]);
    }
}
?>
