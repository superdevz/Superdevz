<?php

namespace App;

use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;
use Illuminate\Database\Eloquent\Model;

class Category extends Model implements Sortable
{
    use SortableTrait;

    public $sortable = [
        'order_column_name' => 'order',
        'sort_when_creating' => true,
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function pages()
    {
        return $this->hasMany('App\Page');
    }

    protected static function boot() {
        parent::boot();

        static::deleting(function($category) {
             $category->pages()->delete();
        });
    }
}
