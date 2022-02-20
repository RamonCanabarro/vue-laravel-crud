<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tag;

class TagController extends Controller
{
    public function index()
    {
        $tags = Tag::all()->toArray();
        return array_reverse($tags);      
    }
    public function store(Request $request)
    {
        $tag = new Tag([
            'name' => $request->input('name')
        ]);
        $tag->save();
        return response()->json('Tag created!');
    }
    public function show($id)
    {
        $tag = Tag::find($id);
        return response()->json($tag);
    }
    public function update($id, Request $request)
    {
        $tag = Tag::find($id);
        $tag->update($request->all());
        return response()->json('Tag updated!');
    }
    public function destroy($id)
    {
        $tag = Tag::find($id);
        $tag->delete();
        return response()->json('Tag deleted!');
    }
}
