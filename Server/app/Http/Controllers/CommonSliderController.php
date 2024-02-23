<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Slider;
use App\Models\SliderImage;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class CommonSliderController extends Controller
{

    public function index (){
        $sliderList = Slider::with('SliderImage')->get();
        $sliderLists = [];
        foreach ($sliderList as $item){
            $silderImage = $item->SliderImageOne;
            $imagename = "";
            if ($silderImage !== null) {
                $imagename = $silderImage->fldTitle;
            }
            $sliderLists[] = [
                'id' => $item->fldSliderID,
                'title' => $item->fldTitle,
                'decrp' => $item -> fldDescription,
                'imageName' => $imagename,
                'imageUrl'   => asset("storage/Uploads/Sliders/".$imagename)
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
        $silderImage = $sliderList ->SliderImage;
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
            'fldDescription' => $request->desc,
            //'fldLink'    => $request->link
        ]);
        return response()->json([
            'status' => 'success',
            'message' => 'Sliders created successfully',
            'createSlider' => $createSlider
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
        $slider->fldTitle = $request->title;
        $slider->fldDescription = $request->desc;
        $slider->save();
        return response()->json([
            'status' => 'success',
            'message' => 'Slider updated successfully',
            'todo' => $slider,
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
