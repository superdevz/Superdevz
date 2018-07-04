<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\PageCollection;
use App\Http\Requests\StorePage;
use App\Http\Requests\UpdatePage;
use App\Http\Requests\DragPage;
use App\Category;
use App\Page;
use Auth;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function all()
    {
        return new PageCollection(Page::whereUserId(Auth::id())->orderBy('order', 'desc')->get());
    }

    public function drag(DragPage $request)
    {
        $pages = Page::all();
        foreach ($pages as $page) {
            $page->timestamps = false;
            $id = $page->id;
            foreach ($request->pages as $pageFrontEnd) {
                if ($pageFrontEnd['id'] == $id) {
                    $page->update(['order' => $pageFrontEnd['order']]);
                }
            }
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePage $request, Category $category)
    {
        $page = new Page;

        $page->user_id = Auth::id();
        $page->category_id = $category->id;
        $page->order = Page::whereUserId(Auth::id())->count() + 1;
        $page->title = $request->title;
        $page->self = \Purifier::clean($request->markdown);

        $page->save();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePage $request, Page $page)
    {
        $page->title = $request->title;
        $page->self = \Purifier::clean($request->markdown);

        $page->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Page $page)
    {
        $page->delete();
    }
}
