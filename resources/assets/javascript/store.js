import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import router from './router';
import axios from 'axios';
import defaultState from './default-state.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: defaultState,
    getters: {
        sortedCategories(state) {
            return state.categories;
        },
        sortedPages(state) {
            if (state.selectedCard.categories.id == undefined) {
                return [];
            } else {
                let pages = state.pages;
                return pages.filter(page => page.category_id == state.selectedCard.categories.id);
            }
        },
        hasPages(state) {
            let filteredPages = state.pages.filter(page => page.category_id == state.selectedCard.categories.id);
            if(filteredPages.length == 0 && state.selectedCard.categories.id != undefined) {
                return false;
            }
            return true;
        },
        getPage: (state) => (id) => {
            return state.pages.find(page => page.id === id);
        },
        getCategory: (state) => (id) => {
            return state.categories.find(category => category.id === id);
        },
        getCategoryColor: (state, getters) => (id) => {
            return getters.getCategory(id).color;
        }
    },
    mutations: {
        pageLoading (state, visibility) {
            state.pageLoading = visibility;
        },
        setAuth (state, auth) {
            state.auth = auth;
        },
        setCategoriesSort(state, sort) {
            state.sort.categories = sort;
            state.categories = state.categories.reverse();
        },
        addFlash (state, flash) {
            state.alertCount++;
            state.alerts.push({
                id: state.alertCount,
                message: flash.message,
                timeout: flash.timeout
            });
        },
        removeFlash (state, id) {
            let i = state.alerts.map(item => item.id).indexOf(id);
            state.alerts.splice(i, 1);
        },
        setProfile (state, profile) {
            state.profile.name = profile.name;
            state.profile.email = profile.email;
            state.profile.avatarSm = profile.avatarSm;
            state.profile.avatarMd = profile.avatarMd;
            state.profile.joinDate = profile.joinDate;
        },
        categoriesLoading (state, visibility) {
            state.loading.categories = visibility;
        },
        categoriesError (state, visibility) {
            state.error.categories = visibility;
        },
        pagesLoading (state, visibility) {
            state.loading.pages = visibility;
        },
        pagesError (state, visibility) {
            state.error.pages = visibility;
        },
        setCategories (state, categories) {
            state.categories = _.orderBy(categories, 'order', state.sort.categories);
        },
        setPages (state, pages) {
            state.pages = _.orderBy(pages, 'order', state.sort.pages);
        },
        setCategoriesAddFormVisibility (state, visibility) {
            state.formVisiblity.categories.add = visibility;
        },
        setCategoriesEditFormVisibility (state, visibility) {
            state.formVisiblity.categories.edit = visibility;
        },
        setSelectedCategory (state, category) {
            state.selectedCard.categories.id = category.id;
            state.selectedCard.categories.data.name = category.self;
            state.selectedCard.categories.data.color = category.color;
        },
        setCategoryEditMode (state, mode) {
            state.formVisiblity.categories.add = false;
            state.formVisiblity.categories.edit = mode;
        },
        addCategoryAsc(state, category) {
            state.categories.push({
                id: category.id,
                order: category.order,
                self: category.self,
                color: category.color
            });
        },
        addCategoryDesc(state, category) {
            state.categories.unshift({
                id: category.id,
                order: category.order,
                self: category.self,
                color: category.color
            });
        },
        editCategory(state, payload) {
            let position = state.categories.findIndex((element) => {
                return element.id == payload.id;
            });
            state.categories.splice(position, 1, payload.category);
        },
        deleteCategory(state, id) {
            let position = state.categories.findIndex((element) => {
                return element.id == id;
            });
            state.categories.splice(position, 1);
        },
        orderCategories (state, categories) {
            state.categories = categories;
        },
        setPagesSort(state, sort) {
            state.sort.pages = sort;
            state.pages = state.pages.reverse();
        },
        setPagesAddFormVisibility (state, visibility) {
            state.formVisiblity.pages.add = visibility;
        },
        setPagesEditFormVisibility (state, visibility) {
            state.formVisiblity.pages.edit = visibility;
        },
        addPageAsc(state, page) {
            state.pages.push({
                id: page.id,
                category_id: page.category_id,
                order: page.order,
                title: page.title,
                markdown: page.markdown
            });
        },
        addPageDesc(state, page) {
            state.pages.unshift({
                id: page.id,
                category_id: page.category_id,
                order: page.order,
                title: page.title,
                markdown: page.markdown
            });
        },
        setPageEditMode (state, mode) {
            state.formVisiblity.pages.add = false;
            state.formVisiblity.pages.edit = mode;
        },
        editPage(state, payload) {
            let position = state.pages.findIndex((element) => {
                return element.id == payload.id;
            });
            state.pages.splice(position, 1, payload.page);
        },
        orderPages (state, pages) {
            state.pages = pages;
        },
        setSelectedPage (state, page) {
            state.selectedCard.pages.id = page.id;
            state.selectedCard.pages.data.category_id = page.category_id;
            state.selectedCard.pages.data.title = page.title;
            state.selectedCard.pages.data.markdown = page.markdown;
        },
        setPageAddMode (state, mode) {
            state.formVisiblity.pages.add = mode;
        },
        deletePage (state, id) {
            let position = state.pages.findIndex((element) => {
                return element.id == id;
            });
            state.pages.splice(position, 1);
        },
        setPageFormVisibility (state, visibility) {
            state.pageFormVisibility = visibility;
        },
        setPageFormTextarea (state, markdown) {
            state.pageFormTextarea = markdown;
        },
        fluchState (state) {
            const s = defaultState();
            Object.keys(s).forEach(key => {
                state[key] = s[key]
            });
        },
        setPageHeight (state, height) {
            state.pageHeight = height;
        }
    },
    actions: {
        pageLoading ({commit}, visibility) {
            commit('pageLoading', visibility);
        },
        setAuth({commit}, auth) {
            commit('setAuth', auth);
        },
        setCategoriesSort({commit}, sort) {
            commit('setCategoriesSort', sort);
        },
        setProfile (context, profile) {
            context.commit('setProfile', profile);
        },
        fetchProfile (context) {
            axios.get(route('profile.sync'))
            .then(data => {
                context.dispatch('setProfile', data.data.data);
            });
        },
        setupProfile (context, later) {
            axios.defaults.headers.common['X-CSRF-TOKEN'] = later.csrfToken;
            return new Promise((resolve, reject) => {
                axios.get(route('profile.sync'))
                .then(data => {
                    context.dispatch('setProfile', data.data.data);
                    context.dispatch('fetchCore');
                    resolve();
                    router.push({ name: 'home' });
                    flash(later.flash, later.timeout);
                });
            })
        },
        initApp(context) {
            window.flash = function (message, timeout) {
                context.commit('addFlash', {
                    message: message,
                    timeout: timeout
                });
            }
            window.onload = function () {
                if (context.state.auth) {
                    axios.get(route('profile.sync'))
                    .then(data => {
                        context.dispatch('setProfile', data.data.data);
                        context.commit('pageLoading', false);
                        context.dispatch('fetchCore');
                    })
                    .catch(error => {
                        context.commit('pageLoading', false);
                    });
                } else {
                    context.commit('pageLoading', false);
                }
            };
        },
        hideAlert(context, id) {
            context.commit('removeFlash', id);
        },
        resetSelectedCards () {
            context.commit('removeFlash', id);
        },
        flushCore ({commit}) {
            commit('fluchState');
        },
        signout (context) {
            context.commit('pageLoading', true);
            axios.post(route('signout'))
            .then(data => {
                axios.defaults.headers.common['X-CSRF-TOKEN'] = data.data.csrfToken;
                context.dispatch('flushCore');
                context.commit('pageLoading', false);
            })
            .catch(error => {
                context.commit('pageLoading', false);
            });
        },
        fetchCategories (context) {
            return new Promise((resolve, reject) => {
                context.commit('categoriesLoading', true);
                axios.get(route('category.all'))
                .then(data => {
                    context.commit('setCategories', data.data.data)
                    resolve();
                    context.commit('categoriesLoading', false);
                })
                .catch(error => {
                    if (!error.status) {
                        context.commit('categoriesError', true);
                    }
                });
            });
        },
        fetchPages (context) {
            return new Promise((resolve, reject) => {
                context.commit('pagesLoading', true);
                axios.get(route('page.all'))
                .then(data => {
                    context.commit('setPages', data.data.data);
                    resolve();
                    context.commit('pagesLoading', false);
                })
                .catch(error => {
                    if (!error.status) {
                        context.commit('pagesError', true);
                    }
                });
            });
        },
        fetchCore (context) {
            Promise.all([
                context.dispatch('fetchCategories'),
                context.dispatch('fetchPages')
            ]).then(() => {
                if (router.currentRoute.name == 'home') {
                    let params = router.currentRoute.params;
                    if(params.page != undefined && params.category != undefined && params.edit == 'edit') {
                        context.dispatch('setSelectedCategory', context.getters.getCategory(parseInt(params.category)));
                        context.dispatch('setSelectedPage', context.getters.getPage(parseInt(params.page)));
                        context.dispatch('setPageFormTextarea', context.getters.getPage(parseInt(params.page)).markdown);
                        context.dispatch('setPageFormVisibility', true);
                    } else if(params.page != undefined && params.category != undefined) {
                        context.dispatch('setSelectedCategory', context.getters.getCategory(parseInt(params.category)));
                        context.dispatch('setSelectedPage', context.getters.getPage(parseInt(params.page)));
                    } else if(params.category != undefined) {
                        context.dispatch('setSelectedCategory', context.getters.getCategory(parseInt(params.category)));
                    }
                }
            });
        },
        setCategoriesAddFormVisibility ({commit}, visibility) {
            commit('setCategoriesAddFormVisibility', visibility);
        },
        setCategoriesEditFormVisibility ({commit}, visibility) {
            commit('setCategoriesEditFormVisibility', visibility);
        },
        setSelectedCategory (context, category) {
            context.commit('setSelectedCategory', category);
            if (context.state.selectedCard.pages.data.category_id != category.id) {
                context.commit('setSelectedPage', {
                    id: undefined,
                    category_id: undefined,
                    data: {
                        title: '',
                        markdown: ''
                    }
                });
            }
        },
        setCategoryEditMode ({commit}, mode) {
            commit('setCategoryEditMode', mode);
        },
        addCategory({commit}, payload) {
            if (payload.sort == 'desc') {
                commit('addCategoryDesc', payload.category);
            } else {
                commit('addCategoryAsc', payload.category);
            }
        },
        editCategory({commit}, payload) {
            commit('editCategory', payload);
        },
        deleteCategory({commit}, id) {
            commit('deleteCategory', id);
            commit('setSelectedCategory', {
                id: undefined,
                data: {
                    name: '',
                    color: ''
                }
            });
        },
        orderCategories ({commit}, categories) {
            commit('orderCategories', categories);
        },
        syncCategories (context, payload) {
            var orderedCategories = [];
            payload.categories.map((category) => {
                orderedCategories.push(category.id);
            });
            if (payload.sort == 'desc') {
                orderedCategories.reverse();
            }
            axios.patch(route('category.drag'), {
                categories: orderedCategories
            });
        },
        setPagesSort({commit}, sort) {
            commit('setPagesSort', sort);
        },
        setPagesAddFormVisibility ({commit}, visibility) {
            commit('setPagesAddFormVisibility', visibility);
        },
        setPagesEditFormVisibility ({commit}, visibility) {
            commit('setPagesEditFormVisibility', visibility);
        },
        addPage({commit}, payload) {
            if (payload.sort == 'desc') {
                commit('addPageDesc', payload.page);
            } else {
                commit('addPageAsc', payload.page);
            }
        },
        setPageEditMode ({commit}, mode) {
            commit('setPageEditMode', mode);
        },
        editPage({commit}, payload) {
            commit('editPage', payload);
        },
        syncPages (context, payload) {
            var orderedPages = [];
            payload.pages.map((page) => {
                orderedPages.push(page.id);
            });
            if (payload.sort == 'desc') {
                orderedPages.reverse();
            }
            axios.patch(route('page.drag'), {
                pages: orderedPages
            });
        },
        orderPages ({commit}, pages) {
            commit('orderPages', pages);
        },
        setSelectedPage ({commit}, page) {
            commit('setSelectedPage', page);
        },
        setPageAddMode ({commit}, mode) {
            commit('setPageAddMode', mode);
        },
        deletePage ({commit}, id) {
            commit('deletePage', id);
        },
        setPageFormVisibility ({commit}, visibility) {
            commit('setPageFormVisibility', visibility);
        },
        setPageFormTextarea ({commit}, markdown) {
            commit('setPageFormTextarea', markdown);
        },
        setPageHeight ({commit}, height) {
            commit('setPageHeight', height);
        }
    }
});

export default store;
