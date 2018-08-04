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
                        <div class="app-navbar-menu" v-if="auth && name != ''">
                            <ul>
                                <li><span>Hello, <span v-text="name"></span></span></li>
                                <navbar-dropdown></navbar-dropdown>
                            </ul>
                        </div>
                    </transition>
                </nav>
            </div>
        </header>

        <main id="app-main" class="app-main container" :class="[ currentRoute == 'auth' ? bgClass : '' ]">
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
                    <p><small>&copy; Codolog - Notes, without a pain</small></p>
                    <p><small>Made with <i class="fas fa-heart heart"></i> by <a href="https://abdalla.js.org" target="_blank">Abdalla Arbab</a> licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a><span v-if="currentRoute == 'auth'"> - Icons made by <a href="https://www.flaticon.com/" title="Flaticon" target="_blank">Flaticon</a></span></small></p>
                </div>
            </div>
        </footer>
        <div class="fixed-alerts">
            <div class="fixed-alerts-container">
                <transition-group name="alerts" tag="div">
                    <flash v-for="alert in alerts" :key="alert.id" :timeout="alert.timeout" :id="alert.id">{{ alert.message }}</flash>
                </transition-group>
            </div>
        </div>
        <div class="not-supported">
            <p>Sorry, this app can only work in a bigger screen</p>
            <small>≥ 1300px wide only</small>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import router from './router';

    export default {
        router,
        data () {
            return {
                bgClass: 'gray-bg'
            }
        },
        mounted() {
            let self = this;
            this.$store.dispatch('initApp');
            this.$nextTick(function () {
                self.setAppMainHeight();
                window.onresize = function(event) {
                    self.setAppMainHeight();
                };
            });
        },
        computed: {
            loading () {
                return this.$store.state.pageLoading;
            },
            auth () {
                return this.$store.state.auth;
            },
            name () {
                return this.$store.state.profile.name;
            },
            alerts () {
                return this.$store.state.alerts;
            },
            currentRoute() {
                return this.$route.name;
            }
        },
        methods: {
            setAppMainHeight() {
                var height = window.innerHeight ||
                            document.documentElement.clientHeight ||
                            document.body.clientHeight;
                height = height - 83;
                document.getElementById('app-main').style.height = height + 'px';
                console.log(height);
            }
        }
    }
</script>
