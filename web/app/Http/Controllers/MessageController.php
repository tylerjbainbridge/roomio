<?php

namespace App\Http\Controllers;
use App\Message;
use App\User;
use Validator;
use Response;
use Illuminate\Http\Request;

class MessageController extends Controller {

    public function index() {
        $messages = Message::with(['user'])->paginate(15);
        return response()->json(compact('messages'));
    }

    public function getMessagesForTopic($topicRef) {
        $messages = Message::with(['user'])
                      ->where('topic_ref', '=', $topicRef)
                      ->paginate(20);

        return Response::json(compact('messages'), 200);                
    }

    public function store(Request $request) {
        $rules = array(
            'content' => 'required|string',
            'topic_ref' => 'required|alpha_num'
        );

        $messageFields = $request->all();

        $messageFields['user_id'] = $request->user()->id;

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $messages = $validator->messages();
            return Response::json(compact('messages'), 400);
            return response(400)->json(compact('messages'));
        }

        $message = Message::create($messageFields);

        $message['user'] = [
          'id' => $request->user()->id,
          'username' => $request->user()->username
        ];

        return Response::json(compact('message'), 200);
    }

    public function storeRobot(Request $request) {
        $rules = array(
            'content' => 'required|string',
            'topic_ref' => 'required|alpha_num'
        );

        $messageFields = $request->all();

        $user = User::where('username', 'roomio_bot')->first();

        $messageFields['user_id'] = $user['id'];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $messages = $validator->messages();
            return Response::json(compact('messages'), 400);
            return response(400)->json(compact('messages'));
        }

        $message = Message::create($messageFields);

        $message['user'] = [
          'id' => $user['id'],
          'username' => 'roomio_bot'
        ];

        return Response::json(compact('message'), 200);
    }
}
