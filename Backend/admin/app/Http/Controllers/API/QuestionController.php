<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Controllers\CloudinaryStorage;
use Illuminate\Http\Request;
use App\Models\Questions;
use Illuminate\Support\Facades\Storage;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class QuestionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function findAll()
    {
        try {
            $questions = Questions::all();
            return response()->json($questions);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'something when wrong',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function findOne(Request $request)
    {
        try {
            $questions = Questions::where('id', $request->id)->first();
            if ($questions) {
                return response()->json($questions);
            } else {
                return response()->json([
                    'message' => 'question id not found'
                ], 404);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'something went wrong',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function create(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'image_question' => 'required|image',
                'A' => 'required',
                'B' => 'required',
                'C' => 'required',
                'D' => 'required',
                'answer' => 'required',
            ]);

            try {
                $image = $request->file('image_question');
                $folderPath = 'Trivia/Question';
                $tags = 'Trivia, CelebMinds, Question';
                $response = CloudinaryStorage::upload($image->getRealPath(), $image->getClientOriginalName(), $folderPath, $tags);
            } catch (CloudinaryException $e) {
                return response()->json([
                    'message' => $e->getMessage()
                ], 500);
            }

            $question = Questions::create([
                'image_question' => $response,
                'A' => $request->A,
                'B' => $request->B,
                'C' => $request->C,
                'D' => $request->D,
                'answer' => $request->answer,
            ]);

            return response()->json([
                'message' => 'question created successfully',
                'data' => $question
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Failed to create question',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, Questions $questions)
    {
        try {
            $questions = Questions::where('id', $request->id)->first();
            if ($questions) {
                $validatedData = $request->validate([
                    'A' => 'required',
                    'B' => 'required',
                    'C' => 'required',
                    'D' => 'required',
                    'answer' => 'required',
                ]);
                
                if ($request->hasFile('image_question')) {
                    $image = $request->file('image_question');
                    $imageStored = $questions->image_question;

                    CloudinaryStorage::delete($imageStored);

                    $folderPath = 'Trivia/Question';
                    $tags = 'Trivia, CelebMinds, Question';
                    $response = CloudinaryStorage::upload($image->getRealPath(), $image->getClientOriginalName(), $folderPath, $tags);
                    $questions->update([
                        'image_question' => $response,
                        'A' => $request->A,
                        'B' => $request->B,
                        'C' => $request->C,
                        'D' => $request->D,
                        'answer' => $request->answer,
                    ]);
                } else {
                    $questions->update([
                        'A' => $request->A,
                        'B' => $request->B,
                        'C' => $request->C,
                        'D' => $request->D,
                        'answer' => $request->answer,
                    ]);
                }

                return response()->json([
                    'message' => 'question updated successfully',
                    'data' => $questions
                ], 200);
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
            $question = Questions::where('id', $request->id)->first();
            if ($question) {
                $image = $question->image_question;
                CloudinaryStorage::delete($image);
                $question->delete();
                return response()->json([
                    'message' => 'question deleted successfully'
                ], 200);
            } else {
                return response()->json([
                    'message' => 'question id not found'
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
