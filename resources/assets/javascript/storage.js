import Vue from 'vue';
import Storage from 'vue-ls';

Vue.use(Storage, {
    namespace: 'codolog'
});

if(Vue.ls.get('Auth') === null) {
    Vue.ls.set('Auth', false);
}
if(Vue.ls.get('ApiToken') === null) {
    Vue.ls.set('ApiToken', false);
}
if(Vue.ls.get('CategoriesSort') === null) {
    Vue.ls.set('CategoriesSort', 'desc');
}
if(Vue.ls.get('PagesSort') === null) {
    Vue.ls.set('PagesSort', 'desc');
}
