<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Post;

class UserPostController extends Controller
{
    public function index()
{
    // Fetch all posts from the database
    $posts = Post::all();

    // Return the posts as a JSON response
    return response()->json(['posts' => $posts]);
}
public function create(Request $request)
{
    $validator = Validator::make($request->all(), [
        'title' => 'required',
        'content' => 'required'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => '422',
            'error' => $validator->errors(),
        ]);
    }

    // If validation passes, create and save the post
    $model = new Post();
    $model->title = $request->title;
    $model->content = $request->content;
    $model->save();

    return response()->json([
        'status' => '200',
        'msg' => 'Post added successfully!',
    ]);
}
public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'content' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => '422',
                'error' => $validator->errors(),
            ]);
        }

        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                'status' => '404',
                'error' => 'Post not found',
            ]);
        }

        $post->title = $request->title;
        $post->content = $request->content;
        $post->save();

        return response()->json([
            'status' => '200',
            'msg' => 'Post updated successfully!',
        ]);
    }

    public function destroy($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                'status' => '404',
                'error' => 'Post not found',
            ]);
        }

        $post->delete();

        return response()->json([
            'status' => '200',
            'msg' => 'Post deleted successfully!',
        ]);
    }
}
