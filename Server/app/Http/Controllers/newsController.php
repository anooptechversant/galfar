<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\News;
use App\Models\NewsImage;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class newsController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api');
    }
    public function index (){
        $newsList = News::with('NewsImage')->get();
        $newsLists = [];
        foreach ($newsList as $item){
            $newsImageArray = [];
            $newsImage = $item->NewsImage;
            foreach ($newsImage as $itemI){
                $newsImageArray[] = [
                    'imageID' => $itemI->fldNewsImgID,
                    'newsID' => $itemI->fldNews_ID,
                    'imageTitle' => $itemI->fldImageTitle,
                    'imageTitleArab' => $itemI->fldImageTitleArab,
                    'imageDescrp' => $itemI->fldImageDescription,
                    'imageDescrpArab' => $itemI->fldImageDescriptionArab,
                    'image' => $itemI->fldImage

                ];
            }
            $newsLists[] = [
                'id' => $item->fldNewsID,
                'title' => $item->fldTitle,
                'titleArab' => $item->fldTitleArab,
                'decrp' => $item -> fldDescription,
                'descrpArab' => $item ->fldDescriptionArab,
                'images' => $newsImageArray
            ];
        }
        return response()->json([
            'status' => 'success',
            'data' => $newsLists
        ]);
    }
    public function show ($id){
        $newsList = News::with('NewsImage')->find($id);
        $newsLists = [];
        $newsLists['id'] = $newsList ->fldNewsID;
        $newsLists['title'] = $newsList ->fldTitle;
        $newsLists['titleArab'] = $newsList -> fldTitleArab;
        $newsLists['decrp'] = $newsList ->fldDescription;
        $newsLists['decrpArab'] = $newsList->fldDescriptionArab;
        $newsImage = $newsList ->NewsImage;
        $newsImageArray = [];
        foreach ($newsImage as $itemI){
            $newsImageArray[] = [
                'imageID' => $itemI->fldNewsImgID,
                'newsID' => $itemI->fldNews_ID,
                'imageTitle' => $itemI->fldImageTitle,
                'imageTitleArab' => $itemI->fldImageTitleArab,
                'imageDesc' => $itemI->fldImageDescription,
                'imageDescArab' => $itemI->fldImageDescriptionArab,
                'image' => $itemI->fldImage,
                'imageUrl'   => asset("storage/Uploads/News/".$itemI->fldImage)

            ];
        }
        $newsLists['images'] = $newsImageArray;
        return response()->json([
            'status' => 'success',
            'data' => $newsLists
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255'
        ]);
        $createNews = news::create([
            'fldTitle' => $request->title,
            'fldTitleArab' => $request->arabictitle,
            'fldDescription' => $request->desc,
            'fldDescriptionArab' => $request->arabicdesc,
        ]);
        return response()->json([
            'status' => 'success',
            'message' => 'News created successfully',
            'createSlider' => $createNews
        ]);
    }
    public function destroyNews($id)
    {
        $news = News::find($id);
        $images = $news->NewsImage;
        foreach ($images as $index => $image) {
            $imageName = $image->fldImageTitle;
            $currentDateTime = Carbon::now()->timestamp;
            $sourcePath = Storage::get("public/Uploads/News/".$imageName);
            Storage::put('public/Uploads/News/Trashes/'.$currentDateTime."_".$imageName, $sourcePath);
            Storage::delete("public/Uploads/News/".$imageName);
            $image->delete();
        }
        $news->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'news deleted successfully',
            'page' => $news
        ]);
    }
    public function addNewsImage(Request $request)
    {
       $images = $request->file('images');
        foreach ($images as $index => $image) {
            $uniqueFileName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            Storage::putFileAs('public/Uploads/News/', $image, $uniqueFileName);
            $NewsImage = NewsImage::create([
                'fldNews_ID' => $request->newsID,
                'fldImage' => $uniqueFileName,
                'fldImageTitle' => $request->imageTitle,
                'fldImageTitleArab' => $request->imageTitleArab,
                'fldImageDescription' => $request->imageDesc,
                'fldImageDescriptionArab' => $request->imageDescArab
            ]);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'news Images updated successfully',
            'sliderImage' => $NewsImage
        ]);
    }
    public function update(Request $request, $id)
    {
        $news = News::find($id);
        $news->fldTitle = $request->title;
        $news->fldTitleArab =  $request->arabictitle;
        $news->fldDescription = $request->desc;
        $news->fldDescriptionArab = $request->arabicdesc;
        $news->save();
        return response()->json([
            'status' => 'success',
            'message' => 'News updated successfully',
            'todo' => $news,
        ]);
    }
    public function newsImageDataUpdate(Request $request)
    {
        $requestData = $request->json()->all();
        $news = "";
        foreach ($requestData as $data) {
            $news = NewsImage::find($data['id']);
            if(isset($data['imagetitle'])){
                $news->fldImageTitle = $data['imagetitle'];
            }
            if(isset($data['imagetitlearab'])){
                $news->fldImageTitleArab =  $data['imagetitlearab'];
            }
            if(isset($data['imagedesc'])){
                $news->fldImageDescription = $data['imagedesc'];
            }
            if(isset($data['imagedescarab'])){
                $news->fldImageDescriptionArab = $data['imagedescarab'];
            }
            $news->save();
        }
        return response()->json([
            'status' => 'success',
            'message' => 'News Image Details updated successfully',
            'todo' => $news,
        ]);
    }
    public function destroyNewsImage($id)
    {
        $newsImage = NewsImage::find($id);
        $imageName = $newsImage->fldImage;
        $currentDateTime = Carbon::now()->timestamp;
        $sourcePath = Storage::get("public/Uploads/News/".$imageName);
        Storage::put('public/Uploads/News/Trashes/'.$currentDateTime."_".$imageName, $sourcePath);
        Storage::delete("public/Uploads/News/".$imageName);
        $newsImage->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'News Image deleted successfully',
            'sliderimage' => $newsImage
        ]);
    }
}
