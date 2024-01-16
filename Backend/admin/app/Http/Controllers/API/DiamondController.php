<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Controllers\CloudinaryStorage;
use Illuminate\Http\Request;
use App\Models\Diamond;
use Illuminate\Support\Facades\Storage;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Validator;

class DiamondController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['findAll']]);
    }

    public function findAll()
    {
        try{
            $diamonds = Diamond::all();
            return response()->json([
                'data' => $diamonds
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'something when wrong',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function create(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'amount' => 'required',
                'image' => 'required|image',
                'price' => 'required',
            ]);

            try {
                $image = $request->file('image');
                $folderPath = 'Trivia/Diamond';
                $tags = 'Trivia, CelebMinds, Diamond';
                $response = CloudinaryStorage::upload($image->getRealPath(), $image->getClientOriginalName(), $folderPath, $tags);
            } catch (CloudinaryException $e) {
                return response()->json([
                    'message' => $e->getMessage()
                ], 500);
            }

            $diamonds = Diamond::create([
                'image' => $response,
                'amount' => $request->amount,
                'price' => $request->price,
            ]);
            return response()->json([
                'message' => 'Diamond created successfully',
                'diamonds' => $diamonds
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'something when wrong',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function delete(Request $request)
    {
        try {
            $diamond = Diamond::where('id', $request->id)->first();
            if ($diamond) {
                $image = $diamond->image;
                $folderPath = 'Trivia/Diamond';
                CloudinaryStorage::delete($image, $folderPath);
                $diamond->delete();
                return response()->json([
                    'message' => 'Diamond deleted successfully',
                ], 200);
            } else {
                return response()->json([
                    'message' => 'Diamond not found',
                ], 404);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'something when wrong',
                'error' => $th->getMessage(),
            ], 500);
        }
    }
}
