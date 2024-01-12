<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;


class Questions extends Model
{
    use HasFactory, Notifiable, HasUuids;
    protected $fillable = [
        'image_question',
        'A',
        'B',
        'C',
        'D',
        'answer',
    ];

    public function getIncrementing ()
    {
        return false;
    }

    public function answers()
    {
        return $this->hasMany(Answers::class);
    }

}
