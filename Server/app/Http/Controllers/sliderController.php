<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Slider;
use App\Models\SliderImage;
use App\Models\SliderVersions;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class sliderController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api');
    }
    public function index (){
        $sliderList = Slider::with('SliderImage')
        ->where('fldVersion',0)
        ->get();
        $sliderLists = [];
        foreach ($sliderList as $item){
            $sliderImageArray = [];
            $silderImage = $item->SliderImage;
            $sliderLatestVersion = Slider::where('fldMainSliderID', $item->fldMainSliderID)
                ->orderBy('fldVersion', 'desc')
                ->first();
            foreach ($silderImage as $itemI){
                $sliderImageArray[] = [
                    'imageID' => $itemI->fldSliderImageID,
                    'sliderID' => $itemI->fldSlider_ID,
                    'imageTitle' => $itemI->fldTitle
                ];
            }
            $sliderLists[] = [
                'id' => $item->fldSliderID,
                'title' => $item->fldTitle,
                'decrp' => $item -> fldDescription,
                'version' => $item -> fldVersion,
                'latestVersionPrimaryID' => $sliderLatestVersion->fldSliderID,
                'images' => $sliderImageArray
            ];
        }
        return response()->json([
            'status' => 'success',
            'data' => $sliderLists
        ]);
    }
    public function show ($id){
        $sliderList = Slider::with('SliderImage')->find($id);
        $sliderLists = [];
        $sliderLists['id'] = $sliderList ->fldSliderID;
        $sliderLists['title'] = $sliderList ->fldTitle;
        $sliderLists['decrp'] = $sliderList ->fldDescription;
        $sliderLists['arabictitle'] = $sliderList->fldTitleArab;
        $sliderLists['arabicdecrp'] = $sliderList->fldDescriptionArab;
        $silderImage = $sliderList ->SliderImage;
        $latestVersionList = Slider::where('fldMainSliderID', $sliderList->fldMainSliderID)
                ->where('fldVersion', '<>', 0)
                ->orderBy('fldVersion', 'desc')
                ->get();
        $sliderLists['latestVersion'] = Slider::where('fldMainSliderID', $sliderList->fldMainSliderID)
                ->orderBy('fldVersion', 'desc')
                 ->pluck('fldSliderID')
                 ->first();
        $sliderVersionList=[];
        foreach ($latestVersionList as $itm){
            $sliderVersionList[] = [
                'sliderID' => $itm->fldSliderID,
                'version' => $itm->fldVersion
            ];
        }
        $sliderImageArray = [];
        foreach ($silderImage as $itemI){
            $sliderImageArray[] = [
                'imageID' => $itemI->fldSliderImageID,
                'sliderID' => $itemI->fldSlider_ID,
                'imageTitle' => $itemI->fldTitle,
                'imageUrl'   => asset("storage/Uploads/Sliders/".$itemI->fldTitle)

            ];
        }
        $sliderLists['images'] = $sliderImageArray;
        $sliderLists['versionLists'] = $sliderVersionList;
        return response()->json([
            'status' => 'success',
            'data' => $sliderLists
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255'
        ]);
        $createSlider = Slider::create([
            'fldTitle' => $request->title,
            'fldTitleArab' => $request->arabictitle,
            'fldDescription' => $request->desc,
            'fldDescriptionArab' => $request->arabicdesc,
            'fldVersion' => 0
            //'fldLink'    => $request->link
        ]);
        $insertedId = $createSlider->fldSliderID;
        $sliderUpdate = Slider::find($insertedId);
        $sliderUpdate->fldMainSliderID = $insertedId;
        $sliderUpdate->save();
        $createSlider = Slider::create([
            'fldTitle' => $request->title,
            'fldTitleArab' => $request->arabictitle,
            'fldDescription' => $request->desc,
            'fldDescriptionArab' => $request->arabicdesc,
            'fldVersion' => 1
            //'fldLink'    => $request->link
        ]);
        $insertedIdv1 = $createSlider->fldSliderID;
        $sliderUpdatev1 = Slider::find($insertedIdv1);
        $sliderUpdatev1->fldMainSliderID = $insertedId;
        $sliderUpdatev1->save();
        return response()->json([
            'status' => 'success',
            'message' => 'Sliders created successfully',
            'createSlider' => $createSlider
        ]);
    }
    public function destroySlider($id)
    {
        $sliderDeleteID = Slider::find($id);
        $mainSliderID = $sliderDeleteID->fldMainSliderID;
        $sliderList = Slider::where('fldMainSliderID', $mainSliderID)
                                    ->get();
        foreach ($sliderList as $item){
            $Sliders = Slider::with('SliderImage')->find($item->fldSliderID);
            //return $Sliders;
            if($Sliders->SliderImage != ""){
                foreach ($Sliders->SliderImage as $item){
                    $imageName = $item->fldTitle;
                    $currentDateTime = Carbon::now()->timestamp;
                    $sourcePath = Storage::get("public/Uploads/Sliders/".$imageName);
                    Storage::put('public/Uploads/Sliders/Trashes/'.$currentDateTime."_".$imageName, $sourcePath);
                    Storage::delete("public/Uploads/Sliders/".$imageName);
                    $item->delete();
                }
            }
            $Sliders->delete();
        }

        return response()->json([
            'status' => 'success',
            'message' => 'page deleted successfully',
            'page' => $Sliders
        ]);
    }
    public function addSliderImage(Request $request)
    {
       $images = $request->file('images');
        foreach ($images as $index => $image) {
            $uniqueFileName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            Storage::putFileAs('public/Uploads/Sliders/', $image, $uniqueFileName);
            $SliderImage = SliderImage::create([
                'fldSlider_ID' => $request->sliderID,
                'fldTitle' => $uniqueFileName
            ]);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'slider Images updated successfully',
            'sliderImage' => $SliderImage
        ]);
    }
    public function update(Request $request, $id)
    {
        $slider = Slider::find($id);
        $mainSliderID = Slider::find($id)->fldMainSliderID;
        $sliderUpdate = Slider::where('fldMainSliderID', $mainSliderID)
            ->where('fldVersion', '=', 0)
            ->first();
        $sliderUpdate->fldTitle = $request->title;
        $sliderUpdate->fldTitleArab =  $request->arabictitle;
        $sliderUpdate->fldDescription = $request->desc;
        $sliderUpdate->fldDescriptionArab = $request->arabicdesc;
        $sliderUpdate->save();

        $createSlider = Slider::create([
            'fldTitle' => $request->title,
            'fldTitleArab' => $request->arabictitle,
            'fldDescription' => $request->desc,
            'fldDescriptionArab' => $request->arabicdesc,
            'fldVersion' => Slider::max('fldVersion')+1,
            'fldMainSliderID' => Slider::find($id)->fldMainSliderID
        ]);
        return response()->json([
            'status' => 'success',
            'message' => 'Slider updated successfully',
            'todo' => $createSlider,
        ]);
    }
    public function destroySliderImage($id)
    {
        $sliderImage = SliderImage::find($id);
        $imageName = $sliderImage->fldTitle;
        $currentDateTime = Carbon::now()->timestamp;
        $sourcePath = Storage::get("public/Uploads/Sliders/".$imageName);
        Storage::put('public/Uploads/Sliders/Trashes/'.$currentDateTime."_".$imageName, $sourcePath);
        Storage::delete("public/Uploads/Sliders/".$imageName);
        $sliderImage->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Slider Image deleted successfully',
            'sliderimage' => $sliderImage
        ]);
    }
}
