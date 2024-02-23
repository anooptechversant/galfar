<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\News;
use App\Models\NewsImage;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class CommonNewsController extends Controller
{
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
}
