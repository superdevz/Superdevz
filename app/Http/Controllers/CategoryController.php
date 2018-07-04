<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\CategoryCollection;
use App\Http\Resources\Category as CategoryRow;
use App\Http\Requests\StoreCategory;
use App\Http\Requests\UpdateCategory;
use App\Http\Requests\DragCategory;
use App\Category;
use Auth;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function all()
    {
        return new CategoryCollection(Category::whereUserId(Auth::id())->ordered()->get());
    }

    public function drag(DragCategory $request)
    {
        $categories = Category::whereUserId(Auth::id())->ordered()->get();
        foreach ($categories as $category) {
            $category->timestamps = false;
            $id = $category->id;
            foreach ($request->categories as $categoryFrontEnd) {
                if ($categoryFrontEnd['id'] == $id) {
                    $category->update(['order' => $categoryFrontEnd['order']]);
                }
            }
        }

        // filter the array to only return the id field
        // $categoryFrontEnd;
        // $categories = Category::setNewOrder([3,1,2]);

        return new CategoryCollection($categories);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCategory $request)
    {
        $category = new Category;

        $category->user_id = Auth::id();
        $category->self = $request->name;
        $category->color = $request->color;

        $category->save();

        return new CategoryRow($category);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCategory $request, Category $category)
    {
        $category->self = $request->name;
        $category->color = $request->color;

        $category->save();

        return new CategoryRow($category);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        $category->delete();
    }
}
