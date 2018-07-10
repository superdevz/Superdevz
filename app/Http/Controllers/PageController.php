<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\PageCollection;
use App\Http\Resources\Page as PageRow;
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
        return new PageCollection(Page::whereUserId(Auth::id())->ordered()->get());
    }

    public function drag(DragPage $request)
    {
        $pagesId = $request->pages;
        $pages = Page::setNewOrder($pagesId);

        return response()->json([
            'message' => 'Pages have ordered successfully.'
        ], 200);
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
        $page->title = $request->title;
        $page->self = null;

        $page->save();

        return new PageRow($page);
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

        return new PageRow($page);
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
