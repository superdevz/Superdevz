import VueRouter from 'vue-router';

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
    { path: '/home', component: require('./components/AppContainer.vue'), name: 'home',
        meta: {
            requiresAuth: true
        }
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
        if (codolog.auth == false) {
            return next({
                path: '/auth'
            });
        }
        return next();
    }
    if (to.matched.some(record => record.meta.withoutAuth)) {
        if (codolog.auth == true) {
            return next({
                path: '/home'
            });
        }
        return next();
    }
    return next();
});

export default router;