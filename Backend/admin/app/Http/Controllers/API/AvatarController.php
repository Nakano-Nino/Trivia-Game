<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Controllers\CloudinaryStorage;
use Illuminate\Http\Request;
use App\Models\Avatar;
use Illuminate\Support\Facades\Storage;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class AvatarController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function findAll()
    {
        try{
            $avatars = Avatar::all();
            return response()->json([
                'data' => $avatars
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
                'avatar' => 'required|image',
                'price' => 'required',
            ]);

            try {
                $image = $request->file('avatar');
                $folderPath = 'Trivia/Avatar';
                $tags = 'Trivia, CelebMinds, Avatar';
                $response = CloudinaryStorage::upload($image->getRealPath(), $image->getClientOriginalName(), $folderPath, $tags);

            } catch (CloudinaryException $e) {
                return response()->json([
                    'message' => $e->getMessage()
                ], 500);
            }

            $avatar = Avatar::create([
                'avatar' => $response,
                'price' => $request->price,
            ]);
            return response()->json([
                'message' => 'Avatar created successfully',
                'avatar' => $avatar
            ],200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'something when wrong',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, Avatar $avatar)
    {
        try {
            $avatar = Avatar::where('id', $request->id)->first();
            if ($avatar) {
                
                if ($request->hasFile('avatar')) {
                    $image = $request->file('avatar');
                    $imageStored = $avatar->avatar;
                    CloudinaryStorage::delete($imageStored);

                    $folderPath = 'Trivia/Avatar';
                    $tags = 'Trivia, CelebMinds, Avatar';
                    $response = CloudinaryStorage::upload($image->getRealPath(), $image->getClientOriginalName(), $folderPath, $tags);
                    $avatar->update([
                        'avatar' => $response,
                        'price' => $request->price ?? $avatar->price,
                    ]);
                } else {
                    $avatar->update([
                        'price' => $request->price,
                    ]);
                }
                    
                return response()->json([
                    'message' => 'Avatar updated successfully',
                    'avatar' => $avatar
                ], 200);
            } else {
                return response()->json([
                    'message' => 'Avatar not found',
                ], 404);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'something went wrong',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function delete(Request $request)
    {
        try {
            $avatar = Avatar::where('id', $request->id)->first();
            if ($avatar) {
                $image = $avatar->avatar;
                CloudinaryStorage::delete($image);
                $avatar->delete();
                return response()->json([
                    'message' => 'Avatar deleted successfully',
                ], 200);
            } else {
                return response()->json([
                    'message' => 'Avatar not found',
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
