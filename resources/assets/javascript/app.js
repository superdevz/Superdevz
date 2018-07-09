import Vue from 'vue';
import Vuebar from 'vuebar';
import VTooltip, { VPopover } from 'v-tooltip';
import VueRouter from 'vue-router';
import App from './App.vue';
import axios from 'axios';
import store from './store';

require('./storage');

Vue.use(Vuebar);
Vue.use(VTooltip);
Vue.use(VueRouter);

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
let scrfToken = document.head.querySelector('meta[name="csrf-token"]');

if (scrfToken) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = scrfToken.content;
}

Vue.component('navbar-dropdown', require('./components/NavbarDropdown.vue'));
Vue.component('message', require('./components/Message.vue'));
Vue.component('flash', require('./components/Flash.vue'));
Vue.component('app-categories', require('./components/AppCategories.vue'));
Vue.component('categories-options', require('./components/CategoriesOptions.vue'));
Vue.component('error', require('./components/Error.vue'));
Vue.component('card', require('./components/Card.vue'));
Vue.component('color-circle', require('./components/ColorCircle.vue'));
Vue.component('empty', require('./components/Empty.vue'));
Vue.component('v-popover', VPopover);

// Vue.component('app-pages', require('./components/AppPages.vue'));
// Vue.component('app-page', require('./components/AppPage.vue'));
// Vue.component('page-form', require('./components/PageForm.vue'));
// Vue.component('pages-head', require('./components/PagesHead.vue'));
// Vue.component('error', require('./components/Error.vue'));

// Vue.component('passport-clients', require('./components/passport/Clients.vue'));
// Vue.component('passport-authorized-clients', require('./components/passport/AuthorizedClients.vue'));
// Vue.component('passport-personal-access-tokens', require('./components/passport/PersonalAccessTokens.vue'));

const app = new Vue({
    store,
    el: '#app',
    data() {
        return {

        }
    },
    created () {
        this.$store.dispatch('setAuth', this.$ls.get('Auth'));
        this.$store.dispatch('setApiToken', this.$ls.get('ApiToken'));
        this.$store.dispatch('setCategoriesSort', this.$ls.get('CategoriesSort'));
        this.$store.dispatch('setPagesSort', this.$ls.get('PagesSort'));
    },
    mounted () {
        let self = this;

        this.$store.watch((state) => state.auth, (newValue, oldValue) => {
            this.$ls.set('Auth', newValue);
        });
        this.$store.watch((state) => state.apiToken, (newValue, oldValue) => {
            this.$ls.set('ApiToken', newValue);
        });
        this.$store.watch((state) => state.sort.categories, (newValue, oldValue) => {
            this.$ls.set('CategoriesSort', newValue);
        });
        this.$store.watch((state) => state.sort.pages, (newValue, oldValue) => {
            this.$ls.set('PagesSort', newValue);
        });

        axios.interceptors.response.use((response) => {
            if(response.data.auth == true || response.data.auth == false) {
                self.$store.dispatch('setAuth', response.data.auth);
            }
            if(response.data.redirect) {
                window.location.replace(response.data.redirect);
            }
            if(response.data.flash) {
                flash(response.data.flash, response.data.timeout);
            }
            return response;
        }, (error) => {
            if (error.response.status === 500 || error.response.status === 408 || error.code === 'ECONNABORTED') {
                flash('Whoops, something went wrong', 3000);
            }
            if (error.response.status === 401) {
                if(self.$store.state.auth) {
                    if(error.response.data.auth == true || error.response.data.auth == false) {
                        self.$store.dispatch('setAuth', error.response.data.auth);
                    }
                    if(error.response.data.redirect) {
                        window.location.replace(error.response.data.redirect);
                    }
                    if(error.response.data.flash) {
                        flash(error.response.data.flash, error.response.data.timeout);
                    }
                }
            }
            return Promise.reject(error);
        });        
    },
    template: '<App/>',
    components: { App }
});
