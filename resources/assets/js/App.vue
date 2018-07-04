<template>
    <div id="app" class="app h100">
        <header class="app-header" id="app-header">
            <div class="container">
                <nav class="app-navbar">
                    <div class="app-logo">
                        <router-link :to="{ name: 'home' }">Codolog</router-link>
                        <span class="beta">Beta</span>
                    </div>
                    <transition name="navbar-dropdown-fade">
                        <div class="app-navbar-menu" v-if="auth()">
                            <ul>
                                <li><span>Hello, <span v-text="name"></span></span></li>
                                <navbar-dropdown @signoutHandler="signoutEvent($event)" :avatar="avatar"></navbar-dropdown>
                            </ul>
                        </div>
                    </transition>
                </nav>
            </div>
        </header>

        <main class="app-main container">
            <transition name="page-loader">
                <div v-if="loading" class="app-loader">
                    <div class="loader-bg loader-bg-xl h100"></div>
                </div>
                <router-view v-else></router-view>
            </transition>
        </main>

        <footer class="app-footer text-center">
            <div class="container">
                <div class="app-footer-inner">
                    <p><small>&copy; Codolog - Developers reminder</small></p>
                    <p><small>Made with <i class="fas fa-heart heart"></i> - Icons made by <a href="https://www.flaticon.com/" title="Flaticon">Flaticon</a> and licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></small></p>
                </div>
            </div>
        </footer>
        <div class="fixed-alerts">
            <div class="fixed-alerts-container">
                <transition-group name="alerts" tag="div">
                    <alert v-for="alert in alerts" :key="alert.id" :timeout="alert.timeout" :id="alert.id">{{ alert.message }}</alert>
                </transition-group>
            </div>
        </div>
        <div class="no-supported">
            <p>Sorry, this app can only work in a bigger screen</p>
            <small>≥ 1300px wide only</small>
        </div>
    </div>
</template>

<script>
    import router from './router';
    import store from './store';

    export default {
        store,
        router,
        data() {
            return {
                
            }
        },
        computed: {
            loading () {
                return this.$store.state.loading;
            },
            categories () {
                return this.$store.state.categories;
            },
            pages () {
                return this.$store.state.pages;
            },
            name () {
                return this.$store.state.profile.name;
            },
            avatar () {
                return this.$store.state.profile.avatarSm;
            },
            alerts () {
                return this.$store.state.alerts;
            }
        },
        mounted() {
            this.$store.dispatch('initApp');
        },
        methods: {
            auth: function () {
                return codolog.auth;
            },
            signoutEvent: function (e) {
                this.$store.dispatch('loading', e);
            }
        }
    }
</script>
