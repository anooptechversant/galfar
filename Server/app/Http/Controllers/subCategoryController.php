<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subcategory;
use App\Models\Category;

class subCategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

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

    public function store(Request $request)
    {
        $request->validate([
            'subCategory' => 'required|string|max:255',
            'categoryID' => 'required|numeric|max:20'
        ]);

        $createSubCategory = Subcategory::create([
            'fldTitle' => $request->subCategory,
            'fldCategory_ID' => $request->categoryID

        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'SubCategory created successfully',
            'createSubCategory' => $createSubCategory
        ]);
    }

    public function show($id)
    {
        $subCategory = Subcategory::find($id);
        $subCategoryResult = [];
        $subCategoryResult['subCategory'] = $subCategory->fldTitle;
        $subCategoryResult['subCategoryID'] = $subCategory->fldSubCategoryID;
        $subCategoryResult['categoryID'] = $subCategory->fldCategory_ID;
        return response()->json([
            'status' => 'success',
            'subCategory' => $subCategoryResult,
        ]);
    }

    public function update(Request $request, $id)
    {
        $subCategory = Subcategory::find($id);
        $subCategory->fldTitle = $request->subCategory;
        $subCategory->fldCategory_ID = $request->categoryID;
        $subCategory->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Subcategory updated successfully',
            'todo' => $subCategory,
        ]);
    }

    public function destroy($id)
    {
        $subCategory = Subcategory::find($id);
        $subCategory->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Subcategory deleted successfully',
            'subcategory' => $subCategory
        ]);
    }
}
?>
