<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CloudinaryStorage extends Controller
{
    // private const folder_path = 'Trivia/Avatar';

    public static function path($path){
        return pathinfo($path, PATHINFO_FILENAME);
    }

    public static function upload($image, $filename, $folderPath, $tags){
        $newFilename = str_replace(' ', '_', $filename);
        $public_id = date('Y-m-d_His').'_'.$newFilename;
        $result = cloudinary()->upload($image, [
            "public_id" => self::path($public_id),
            "folder"    => $folderPath,
            "tags"      => $tags
        ])->getSecurePath();

        return $result;
    }

    public static function replace($path, $image, $public_id){
        self::delete($path);
        return self::upload($image, $public_id);
    }

    public static function delete($path, $folderPath){
        $public_id = $folderPath.'/'.self::path($path);
        return cloudinary()->destroy($public_id);
    }
}
