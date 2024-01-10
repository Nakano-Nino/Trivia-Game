<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Questions;
use Illuminate\Support\Facades\Storage;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class QuestionController extends Controller
{
    public function questionFindAll()
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

    public function questionFindOne(Request $request)
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

    public function questionCreate(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'image_question' => 'required|image',
                'answers.*.answer' => 'required',
                'answers.*.is_correct' => 'required|boolean',
            ]);

            try {
                $response = Cloudinary::upload($request->file('image_question'), [
                    'folder' => 'CelebMinds/Question',
                    'tags' => ['question', 'CelebMinds']
                ]);
                $imageUrl = $response->getSecurePath();
            } catch (CloudinaryException $e) {
                return $e->getMessage();
            }

            $question = Question::create([
                'question' => $request->question,
                'image_question' => $imageUrl,
            ]);

            foreach ($request->answers as $answerData) {
                Answer::create([
                    'question_id' => $question->id,
                    'answer' => $answerData['answer'],
                    'is_correct' => $answerData['is_correct'],
                ]);
            }

            return response()->json([
                'message' => 'question created successfully',
                'data' => $questions
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Failed to create question',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function questionUpdate(Request $request, Questions $questions)
    {
        try {
            $questions = Questions::where('id', $request->id)->first();
            if ($questions) {
                $validatedData = $request->validate([
                    'answers.*.answer' => 'required',
                    'answers.*.is_correct' => 'required|boolean',
                ]);
                
                if ($request->hasFile('image_question')) {
                    try {
                        Cloudinary::destroy($questions->image_question);
                        $response = Cloudinary::upload($request->file('image_question'), [
                            'folder' => 'CelebMinds/Question',
                            'tags' => ['question', 'CelebMinds']
                        ]);
                        $imageUrl = $response->getSecurePath();
                    } catch (CloudinaryException $e) {
                        return $e->getMessage();
                    }
                } else {
                    $questions->update(['question' => $request->questions]);
                }

                $questions->answers()->delete();
                
                foreach ($request->answers as $answerData) {
                    Answer::create([
                        'question_id' => $questions->id,
                        'answer' => $answerData['answer'],
                        'is_correct' => $answerData['is_correct'],
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

    public function questionDelete(Request $request)
    {
        try {
            $question = Questions::where('id', $request->id)->first();
            if ($question) {
                Cloudinary::destroy($question->image_question);
                $question->answers()->delete();
                $question->delete();
                return response()->json([
                    'message' => 'question deleted'
                ]);
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
