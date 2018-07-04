import Vuex from 'vuex';
import Vue from 'vue';
import _ from 'lodash';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        loading: true,
        api_token: '',
        profile: {
            name: '',
            email: '',
            avatarSm: '',
            avatarMd: '',
            joinDate: ''
        },
        categoryLoading: false,
        categoryError: false,
        pageLoading: false,
        pageError: false,
        categories: [],
        pages: [],
        sort: {
            categories: '',
            pages: '',
        },
        alerts: [],
        alertCount: 0,
        formVisibility: {
            categories: {
                add: false,
                edit: false
            },
            pages: {
                add: false,
                edit: false
            },
            page: false
        },
        pageFormVisiblity: false
    },
    getters: {
        sortedCategories(state) {
            return _.orderBy(state.categories, 'order', state.sort.categories);
        },
        auth() {
            return window.codolog.auth;
        },
        api_token(state) {
            return 'Bearer ' + state.api_token;
        }
    },
    mutations: {
        loading (state, visibility) {
            state.loading = visibility;
        },
        addFlash(state, flash) {
            state.alertCount++;
            state.alerts.push({
                id: state.alertCount,
                message: flash.message,
                timeout: flash.timeout
            });
        },
        removeFlash(state, id) {
            let i = state.alerts.map(item => item.id).indexOf(id);
            state.alerts.splice(i, 1);
        },
        categoryLoading (state, visibility) {
            state.categoryLoading = visibility;
        },
        categoryError (state, visibility) {
            state.categoryError = visibility;
        },
        pageLoading (state, visibility) {
            state.pageLoading = visibility;
        },
        pageError (state, visibility) {
            state.pageError = visibility;
        },
        setCategories (state, categories) {
            state.categories = categories;
        },
        setPages (state, pages) {
            state.pages = pages;
        },
        syncProfile (state, profile) {
            state.profile.name = profile.name;
            state.profile.email = profile.email;
            state.profile.avatarSm = profile.avatarSm;
            state.profile.avatarMd = profile.avatarMd;
            state.profile.joinDate = profile.joinDate;
        },
        setCategorySort(state, sort) {
            state.sort.categories = sort;
        },
        setPagesSort(state, sort) {
            state.sort.pages = sort;
        }
    },
    actions: {
        api_headers(context) {
            return ;
        },
        loading ({commit}, visibility) {
            commit('loading', visibility);
        },
        fetchProfile (context) {
            axios.get(route('profile.sync'))
            .then(data => {
                context.commit('syncProfile', data.data.data);
                window.codolog.api_token = data.data.data.api_token;
            });
        },
        fetchCategories (context) {
            context.commit('categoryLoading', true);
            context.commit('categoryError', false);
            axios.get(route('category.all'), {
                headers: {  
                    Authorization: context.getters.api_token
                }
            })
            .then(data => {
                context.commit('setCategories', data.data.data)
                context.commit('categoryLoading', false);
            })
            .catch(error => {
                if (!error.status) {
                    context.commit('categoryError', true);
                }
            });
        },
        async syncCategories (context) {
            context.commit('categoryError', false);
            try {
                const data = await axios.get(route('category.all'), {
                    headers: {
                        Authorization: context.getters.api_token
                    }
                });
                context.commit('setCategories', data.data.data);
            } catch (error) {
                context.commit('categoryError', true);
            }
        },
        fetchPages (context) {
            context.commit('pageLoading', true);
            context.commit('pageError', false);
            axios.get(route('page.all'), {
                headers: {
                    Authorization: context.getters.api_token
                }
            })
            .then(data => {
                context.commit('setPages', data.data.data);
                context.commit('pageLoading', false);
            })
            .catch(error => {
                context.commit('pageError', true);
            });
        },
        async syncPages () {
            context.commit('pageError', false);
            try {
                const data = await axios.get(route('page.all'), {
                    headers: {
                        Authorization: context.getters.api_token
                    }
                });
                context.commit('setPages', data.data.data);
            } catch (error) {
                context.commit('pageError', true);
            }
        },
        setDefaults ({commit}) {
            
            commit('setCategorySort', localStorage.getItem('categoriesSort'));
            
            commit('setPagesSort', localStorage.getItem('pagesSort'));
        },
        setCategoriesSort(context, sort) {
            context.commit('setCategorySort', sort);
            localStorage.setItem('categoriesSort', sort);
        },
        initApp(context) {
            if (context.getters.auth) {
                context.dispatch('fetchProfile');
            }
            window.onload = function () {
                context.dispatch('loading', false);
                if (context.getters.auth) {
                    context.dispatch('setDefaults');
                    context.dispatch('fetchCategories');
                    context.dispatch('fetchPages');
                }
                window.flash = function (message, timeout) {
                    context.commit('addFlash', {
                        message: message,
                        timeout: timeout
                    });
                }
            };
        },
        hideAlert(context, id) {
            context.commit('removeFlash', id);
        }
    }
});

export default store;