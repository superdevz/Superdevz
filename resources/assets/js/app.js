import Vue from 'vue';
import Vuebar from 'vuebar';
import VTooltip from 'v-tooltip';
import App from './App.vue';
import store from './store';
import VueRouter from 'vue-router';

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

let scrfToken = document.head.querySelector('meta[name="csrf-token"]');

if (scrfToken) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = scrfToken.content;
}

axios.interceptors.request.use(function (config) {
    if (window.codolog.api_token) {
        window.axios.defaults.headers.common[''] = 'Bearer ' + window.codolog.api_token;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
    // Do something with response data
    if(response.data.auth == true || response.data.auth == false) {
        codolog.auth = response.data.auth;
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
    // Do something with response error
    return Promise.reject(error);
});

Vue.use(Vuebar);
Vue.use(VTooltip);
Vue.use(VueRouter);

Vue.component('navbar-dropdown', require('./components/NavbarDropdown.vue'));
Vue.component('app-container', require('./components/AppContainer.vue'));
Vue.component('app-categories', require('./components/AppCategories.vue'));
Vue.component('app-pages', require('./components/AppPages.vue'));
Vue.component('app-page', require('./components/AppPage.vue'));
Vue.component('app-auth', require('./components/AppAuth.vue'));
Vue.component('app-profile', require('./components/AppProfile.vue'));
Vue.component('page-form', require('./components/PageForm.vue'));
Vue.component('pages-head', require('./components/PagesHead.vue'));
Vue.component('categories-options', require('./components/CategoriesOptions.vue'));
Vue.component('card', require('./components/Card.vue'));
Vue.component('color-circle', require('./components/ColorCircle.vue'));
Vue.component('error', require('./components/Error.vue'));
Vue.component('empty', require('./components/Empty.vue'));
Vue.component('message', require('./components/Message.vue'));
Vue.component('alert', require('./components/Alert.vue'));

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
    template: '<App/>',
    components: { App }
});
