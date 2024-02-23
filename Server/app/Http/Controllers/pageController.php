<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Pages;
use App\Models\PageImage;
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
                'desc' => $item -> fldDesc,
                'imageUrl'=>  asset("storage/Uploads/Pages/".$item->fldImage)
            ];
        }
        return response()->json([
            'status' => 'succesHs',
            'data' => $pageLists
        ]);
    }
    public function show ($id){
        $pageList = Pages::find($id);
        $pageImageArray = [];
        $pageImage = $pageList->PageImage;
        foreach ($pageImage as $itemI){
            $pageImageArray[] = [
                'imageID' => $itemI->fldPageImgID,
                'sliderID' => $itemI->fldPage_ID,
                'imageTitle' => $itemI->fldImage,
                'bannerImage' => $itemI->fldBannerImage,
                'imageUrl' => asset("storage/Uploads/Pages/".$itemI->fldImage)
            ];
        }
        $pageLists = [];
        $pageLists['id']    = $pageList ->fldPageID;
        $pageLists['title'] = $pageList ->fldTitle;
        $pageLists['arabictitle'] = $pageList->fldTitleArab;
        $pageLists['decrp'] = $pageList ->fldDesc;
        $pageLists['arabicdecrp'] = $pageList->fldDescArab;
        $pageLists['images'] = $pageImageArray;
        $pageLists['imageUrl'] = asset("storage/Uploads/Pages/".$pageList->fldImage);
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
            'fldTitleArab' => $request->arabictitle,
            'fldDescArab' => $request->arabicdesc
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
        $pages->fldTitleArab = $request->arabictitle;
        $pages->fldDescArab = $request->arabicdesc;
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
        $images = $pages->PageImage;
        foreach ($images as $index => $image) {
            $imageName = $image->fldImageTitle;
            $currentDateTime = Carbon::now()->timestamp;
            $sourcePath = Storage::get("public/Uploads/Pages/".$imageName);
            Storage::put('public/Uploads/Pages/Trashes/'.$currentDateTime."_".$imageName, $sourcePath);
            Storage::delete("public/Uploads/Pages/".$imageName);
            $image->delete();
        }
        $pages->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'page deleted successfully',
            'page' => $pages
        ]);
    }
    public function addPageImage(Request $request)
    {
       $images = $request->file('images');
        foreach ($images as $index => $image) {
            $uniqueFileName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            Storage::putFileAs('public/Uploads/Pages/', $image, $uniqueFileName);
            $PageImage = PageImage::create([
                'fldPage_ID' => $request->pageID,
                'fldImage' => $uniqueFileName,
                'fldImageTitle' => $uniqueFileName
            ]);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'page
             Images updated successfully',
            'sliderImage' => $PageImage
        ]);
    }
    public function destroyPageImage($id)
    {
        $pageImage = PageImage::find($id);
        $imageName = $pageImage->fldImage;
        $currentDateTime = Carbon::now()->timestamp;
        $sourcePath = Storage::get("public/Uploads/Pages/".$imageName);
        Storage::put('public/Uploads/Pages/Trashes/'.$currentDateTime."_".$imageName, $sourcePath);
        Storage::delete("public/Uploads/Pages/".$imageName);
        $pageImage->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Image deleted successfully',
            'pageimage' => $pageImage
        ]);
    }
    public function updateBanner(request $request)
    {
        $pageImage = PageImage::find($request->id);
        $pageImage->fldBannerImage = $request->val;
        $idArray = [$request->id];
        if($request->val === 1){
            $stat = 0;
            PageImage::whereNotIn('fldPageImgID', $idArray)
            ->update(['fldBannerImage' => $stat]);
        }
        $pageImage->save();
        return response()->json([
            'status' => 'success',
            'message' => 'Page Details Updated successfully',
            'pageimage' => $pageImage
        ]);
    }
}
