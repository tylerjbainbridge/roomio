<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model {
  
    protected $fillable = [
        'content',
        'user_id',
        'topic_id'
    ];
    
    public function user() {
        return $this->belongsTo(User::Class)->select(array('id', 'username'));
    }

    public function topic() {
        return $this->belongsTo(Topic::class);
    }
}
