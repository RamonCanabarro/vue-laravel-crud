<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Tag;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all()->toArray();
        return array_reverse($products);      
    }
    public function store(Request $request)
    {
        $product = new Product([
            'name' => $request->input('name')
        ]);
        $product->save();
        $tags = Tag::find($request->input('tags'));
        $product->tags()->attach($tags);
        return response()->json('Product created!');
    }
    public function show($id)
    {
        $product = Product::find($id);
        $tag = $product->tags()->get();
        $product->tags = $tag;
        return response()->json($product);
    }
    public function update($id, Request $request)
    {
        $product = Product::find($id);
        $product->update($request->all());
        $product->tags()->detach($product->tags);
        $tags = Tag::find($request->input('tags'));
        $product->tags()->attach($tags);
        return response()->json('Product updated!');
    }
    public function destroy($id)
    {
        $product = Product::find($id);
        $product->delete();
        return response()->json('Product deleted!');
    }
}
