import VueRouter from 'vue-router';
import store from './store';

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/auth/:form?/:token?', component: require('./components/AppAuth.vue'), name: 'auth',
        meta: {
            title: 'Codolog | Developers reminder',
            metaTags: [
                {
                    name: 'description',
                    content: 'Developers reminder.'
                },
                {
                    property: 'og:description',
                    content: 'Developers reminder.'
                }
            ],
            withoutAuth: true
        }
    },
    { path: '/home', component: require('./components/AppContainer.vue'),
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '/home/:category_path?/:category?/:page_path?/:page?',
                name: 'home',
                components: {
                    page: require('./components/AppPage.vue'),
                    pages: require('./components/AppPages.vue'),
                    categories: require('./components/AppCategories.vue')   
                }
            }
        ]
    },
    { path: '/profile', component: require('./components/AppProfile.vue'), name: 'profile',
        meta: {
            requiresAuth: true
        }
    },
    { path: '*', component: require('./components/App404.vue') }
];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.state.auth == false) {
            next({
                path: '/auth'
            });
        }
    }
    if (to.matched.some(record => record.meta.withoutAuth)) {
        if (store.state.auth == true) {
            next({
                path: '/home'
            });
        }
    }
    next();
});

export default router;