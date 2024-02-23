<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Pages;
use App\Models\SliderImage;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class PageController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api');
    }
    public function index (){
        $pageList = Pages::get();
        $pageLists = [];
        foreach ($pageList as $item){
            $pageLists[] = [
                'id' => $item->fldPageID,
                'title' => $item->fldTitle,
                'desc' => $item -> fldDesc
            ];
        }
        return response()->json([
            'status' => 'success',
            'data' => $pageLists
        ]);
    }
    public function show ($id){
        $pageList = Pages::find($id);
        $pageLists = [];
        $pageLists['id'] = $pageList ->fldPageID;
        $pageLists['title'] = $pageList ->fldTitle;
        $pageLists['decrp'] = $pageList ->fldDesc;
        return response()->json([
            'status' => 'success',
            'data' => $pageLists
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255'
        ]);

        $pageList = Pages::create([
            'fldTitle' => $request->title,
            'fldDesc'  => $request->desc,
            //'fldLink'    => $request->link
        ]);
        return response()->json([
            'status' => 'success',
            'message' => 'Pages created successfully',
            'createPage' => $pageList
        ]);
    }
    public function update(Request $request, $id)
    {
        $pages = Pages::find($id);
        $pages->fldTitle = $request->title;
        $pages->fldDesc = $request->desc;
        $pages->save();
        return response()->json([
            'status' => 'success',
            'message' => 'Page updated successfully',
            'todo' => $pages,
        ]);
    }
    public function destroyPage($id)
    {
        $pages = Pages::find($id);
        $pages->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'page deleted successfully',
            'page' => $pages
        ]);
    }
}
